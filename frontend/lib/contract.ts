import { parseAbi } from "viem";
//import { arbitrumSepolia } from "viem/chains";
import "dotenv/config";

export const CONTRACT_ADDRESS = "0x20682fb0d6673d73a1d24f70216d2468d5af9b93";

export const ABI = parseAbi([
  "function get_value() public view returns (uint256)",
  "function checkOwnership(bytes32 hash) public view returns (bool)",
  "function storeHash(bytes32) external returns (bytes32)"
]);

/**
 * Antiguos ejemplos dados en el playground
 */

// const account = privateKeyToAccount((process as any).env.PRIVATE_KEY)

// const client = createWalletClient({
//   chain: arbitrumSepolia,
//   transport: http(),
//   account,
// });

// const publicClient = createPublicClient({
//   chain: arbitrumSepolia,
//   transport: http()
// });

// async function read() {
//   const result = await publicClient.readContract({
//     abi: ABI,
//     address: CONTRACT_ADDRESS,
//     functionName: "hola_mundo",
//   });

//   console.debug(`Contract: ${result}`);
// }

// async function write() {
//   const result = await client.writeContract({
//     abi: ABI,
//     address: CONTRACT_ADDRESS,
//     functionName: "set_value",
//     args: [BigInt(12)],
//   });

//   console.debug(`Contract: ${result}`);
// }
