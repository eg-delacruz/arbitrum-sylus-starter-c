import { parseAbi } from "viem";
import "dotenv/config";

export const CONTRACT_ADDRESS = "0x48e6a3f4bf6f2261f67fc026405d6af6101f582b";

export const ABI = parseAbi([
  "function hola_mundo(uint256) external view returns (string)",
  "function checkOwnership(bytes32) public view returns (string)",
  "function storeHash(bytes32) external returns (string)"
]);
