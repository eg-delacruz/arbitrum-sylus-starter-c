import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
  getContract
} from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import "dotenv/config";

const ABI = parseAbi([
  "function get_value() public view returns (uint256)",
  "function checkOwnership(bytes32) public view returns (uint256)",
  "function storeHash(bytes32) returns (uint256)"
]);

const account = privateKeyToAccount((process as any).env.PRIVATE_KEY);

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: http(),
  account
});

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http()
});

// https://sepolia.arbiscan.io/address/const CONTRACT_ADDRESS = "0x46be8751225be83d7a9b97fec0214c53795d8477"
const CONTRACT_ADDRESS = "0x20682fb0d6673d73a1d24f70216d2468d5af9b93";

async function read() {
  const hash = keccak256(stringToBytes("HOLA.MUNDO.MADRID"));

  const result = await publicClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "checkOwnership",
    args: [hash]
  });

  console.debug(`Contract: ${result}`);
}

async function write() {
  const hash = keccak256(stringToBytes("HOLA.MUNDO.MADRID"));

  try {
    const result = await client.writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "storeHash",
      args: [hash],
      account
    });

    console.debug(result);
  } catch (e) {
    console.log("Error", e);
  }
}

read();
//write();
