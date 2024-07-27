import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ status: 'fail', error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const newFileName = `${timestamp}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: newFileName,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand({
      ...params,
      ACL: 'public-read',
    });
    await s3Client.send(command);

    revalidatePath('/');

    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileName}`;
    return NextResponse.json({ status: 'success', imageUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 'fail', error: e });
  }
}
