import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
} from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import "dotenv/config";

const ABI = parseAbi([
  "function hola_mundo() public view returns (string)",
  "function set_value(bytes32) public",
  "function get_value() public view returns (uint256)",
  "function storeHash(bytes32) public view returns (bytes32)",
]);

const account = privateKeyToAccount((process as any).env.PRIVATE_KEY);

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: http(),
  account,
});

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

// https://sepolia.arbiscan.io/address/const CONTRACT_ADDRESS = "0x46be8751225be83d7a9b97fec0214c53795d8477"
const CONTRACT_ADDRESS = "0xf60be222d397f0be3b11dafc1175f070ddf3eb30";

async function read() {
  const hash = keccak256(stringToBytes("Hello, world!"));

  const result = await publicClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "storeHash",
    args: [hash],
  });

  console.debug(`Contract: ${result}`);
}

read();
// write()
