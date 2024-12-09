import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
  getContract,
  toHex,
  fromHex,
  fromBytes
} from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import "dotenv/config";

const ABI = parseAbi([
  "function hola_mundo(uint256) external view returns (string)",
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
const CONTRACT_ADDRESS = "0x707234efcf1eaa130e5b295af013d9db5ca1b95a";

const contract = getContract({
  address: CONTRACT_ADDRESS,
  abi: ABI,
  client: {
    public: publicClient,
    wallet: client
  }
});

async function read() {
  const hash = keccak256(toHex("HOLA.MUNDO.MADRID"));

  try {
    const result = await contract.read.checkOwnership([hash]);

    console.debug(`Contract: ${result}`);
  } catch (e) {
    console.error(e);
  }

  console.log({ hash });
}

async function write() {
  const hash = keccak256(toHex("HOLA.MUNDO.MADRID"));

  try {
    const result = await contract.write.storeHash([hash]);

    console.log({ hash });
    console.debug(`Contract response: ${result}`);
  } catch (e) {
    console.log("Error", e);
  }
}

//console.log({ ABI, inputs: ABI[2].inputs });

//console.log({ account });
//read();
write();
