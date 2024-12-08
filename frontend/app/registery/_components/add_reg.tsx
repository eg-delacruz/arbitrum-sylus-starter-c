"use client";

import { useState } from "react";

import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  keccak256,
  stringToBytes,
} from "viem";

//Components
import Form from "./form";
import AddRegModal from "./add_reg_modal";

import { UseAccountReturnType, useReadContract, useWriteContract } from "wagmi";

type Props = {
  account: UseAccountReturnType;
};

const ABI = parseAbi([
  "function hola_mundo() public view returns (string)",
  "function set_value(bytes32) public",
  "function get_value() public view returns (uint256)",
  "function storeHash(bytes32) external returns (bytes32)",
]);

export default function AddReg({ account }: Props) {
  const [dni, setDni] = useState("");
  const [words, setWords] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showFede, setShowFede] = useState(true);
  const [success, setSuccess] = useState(false);
  const { data, writeContract } = useWriteContract();

  const add_registery = async () => {
    if (dni === "" || words === "") {
      alert("Please fill all the fields");
      return;
    }

    //Check that the format of words is the following: word.word.word
    if (words.split(".").length !== 3) {
      alert(
        "Please fill the words field with the correct format as in https://what3words.com/"
      );
      return;
    }

    const data = `${dni}-${words}-${account.address}`;

    try {
      const hash = keccak256(stringToBytes(data));

      setOpenModal(true);
      setShowFede(true);
      setSuccess(false);

      setTimeout(() => {
        setShowFede(false);
        setSuccess(true);
      }, 7000);
      setTimeout(() => {
        setOpenModal(false);
      }, 10000);

      //Write in blockchain´
      console.log("Writing in blockchain");
      const res = writeContract({
        abi: ABI,
        functionName: "storeHash",
        address: "0xf60be222d397f0be3b11dafc1175f070ddf3eb30",
        args: [hash],
      });
      console.log({ data });
      console.log({ res });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="h-[50vh] flex justify-center items-center">
        <Form
          variant="add"
          dni_input={dni}
          setDni={setDni}
          words_input={words}
          setWords={setWords}
          submitFunction={() => add_registery()}
        />

        <AddRegModal
          openModal={openModal}
          showFede={showFede}
          success={success}
        />
      </div>
    </>
  );
}
