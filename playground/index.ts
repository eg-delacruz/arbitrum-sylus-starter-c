import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
  getContract,
  toHex
} from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import "dotenv/config";

const ABI = parseAbi([
  "function hola_mundo(bytes32) public view returns (string)",
  "function checkOwnership(bytes32) public view returns (string)",
  "function storeHash(bytes32) external returns (string)"
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
const CONTRACT_ADDRESS = "0xfbe9ec3c152203dc2a34857d84b8bed540bd8a08";

async function read() {
  const hash = keccak256(toHex("HOLA.MUNDO.MADRID"));

  try {
    const result = await publicClient.readContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "hola_mundo",
      args: [hash],
      account
    });

    console.debug(`Contract: ${result}`);
  } catch (e) {
    console.error(e);
  }

  console.log({ hash });
}

async function write() {
  const hash = keccak256(toHex("HOLA.MUNDO.MADRID"));

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

//console.log({ ABI, inputs: ABI[2].inputs });

//console.log({ account });
read();
//write();