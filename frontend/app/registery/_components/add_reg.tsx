"use client";

import { useEffect, useState } from "react";

import { keccak256, stringToBytes } from "viem";

import { ABI, CONTRACT_ADDRESS } from "@/lib/contract";
//Components
import Form from "./form";
import AddRegModal from "./add_reg_modal";

import { UseAccountReturnType, useWriteContract } from "wagmi";

type Props = {
  account: UseAccountReturnType;
};

export default function AddReg({ account }: Props) {
  const [dni, setDni] = useState("");
  const [words, setWords] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showFede, setShowFede] = useState(true);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const { data: dataResponse, writeContract } = useWriteContract();

  useEffect(() => {
    setDni("");
    setWords("");
  }, [dataResponse]);

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
      setValidationSuccess(false);

      setTimeout(() => {
        setShowFede(false);
        setValidationSuccess(true);
      }, 7000);
      setTimeout(() => {
        setOpenModal(false);
        //Write in blockchain´
        console.log("Writing in blockchain");
        writeContract({
          abi: ABI,
          functionName: "storeHash",
          address: CONTRACT_ADDRESS,
          args: [hash]
        });
      }, 10000);
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
          success={validationSuccess}
        />
      </div>
      {dataResponse && (
        <div className="flex justify-center">
          <p className="bg-green-500 text-white p-2 rounded-md">
            Registery was succesfully stored in the blockchain
          </p>
        </div>
      )}
    </>
  );
}
