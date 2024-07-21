import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const newFileName = `${timestamp}${fileExtension}`;

    await fs.writeFile(`./public/uploads/${newFileName}`, buffer);

    revalidatePath("/");

    return NextResponse.json({ status: "success", imageUrl: `/uploads/${newFileName}` });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}