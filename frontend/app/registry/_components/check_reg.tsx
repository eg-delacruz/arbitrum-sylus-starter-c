"use client";

import { useState } from "react";
import { JSHash, CONSTANTS } from "react-hash";

//Components
import Form from "./form";
import LoadingModal from "./loading_modal";

import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
} from "viem";

import { useReadContract } from "wagmi";

//Types
import { UseAccountReturnType } from "wagmi";

type Props = {
  account: UseAccountReturnType;
};

const ABI = parseAbi([
  "function hola_mundo() public view returns (string)",
  "function set_value(bytes32) public",
  "function get_value() public view returns (bytes32)",
]);

export default function CheckReg({ account }: Props) {
  const [dni, setDni] = useState("");
  const [words, setWords] = useState("");
  const [loading, setLoading] = useState(false);
  //console.log({ account });

  const result = useReadContract({
    abi: ABI,
    functionName: "get_value",
    address: "0xca63784ee340ff0dbce78ac965f609fc7d30f291",
  });

  console.log(result);

  //TODO: check the 3 words format
  const check_registery = async () => {
    setLoading(true);
    if (dni === "" || words === "") {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    const data = `${dni}-${words}-${account.address}`;

    try {
      const hash = await JSHash(data, CONSTANTS.HashAlgorithms.md5);
      console.log(hash);
    } catch (e) {
      console.log(e);
    }

    //Get hash from blockchain and compare it with the hash generated
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="h-[50vh] flex justify-center items-center">
      <Form
        variant="check"
        dni_input={dni}
        setDni={setDni}
        words_input={words}
        setWords={setWords}
        submitFunction={() => check_registery()}
      />

      <LoadingModal openModal={loading} />
    </div>
  );
}
