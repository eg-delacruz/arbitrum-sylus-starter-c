import { parseAbi } from "viem";
//import { arbitrumSepolia } from "viem/chains";
import "dotenv/config";

export const CONTRACT_ADDRESS = "0x707234efcf1eaa130e5b295af013d9db5ca1b95a";

export const ABI = parseAbi([
  "function hola_mundo(uint256) external view returns (string)",
  "function checkOwnership(bytes32) public view returns (string)",
  "function storeHash(bytes32) external returns (string)"
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
