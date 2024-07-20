// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MemeCoinFactory.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        address uniswapRouter = 0x56A364f7355765f9d0457ee131aBFA06D7cb2e73;
        address uniswapFactory = 0xCEaB4e71463c643B7E5776D14995D8015e1Fa14b;
        address WETH = 0x2911a1AB18546cb501628Be8625C7503a2A7DB54;

        MemeCoinFactory factory = new MemeCoinFactory(uniswapRouter, uniswapFactory, WETH);

        console.log("MemeCoinFactory deployed to:", address(factory));

        vm.stopBroadcast();
    }
}
