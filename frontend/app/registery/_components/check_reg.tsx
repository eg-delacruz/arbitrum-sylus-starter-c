"use client";

import { useState } from "react";

import { ABI, CONTRACT_ADDRESS } from "../../../lib/contract";

//Components
import Form from "./form";
import LoadingModal from "./loading_modal";
import ShowOwnership from "./show_ownership";

import { parseAbi, keccak256, stringToBytes } from "viem";

import { useReadContract } from "wagmi";

//Types
import { UseAccountReturnType } from "wagmi";

type Props = {
  account: UseAccountReturnType;
};

export default function CheckReg({ account }: Props) {
  const [dni, setDni] = useState("");
  const [words, setWords] = useState("");
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  const result = useReadContract({
    abi: ABI,
    functionName: "get_value",
    address: CONTRACT_ADDRESS,
  });

  const check_registery = async () => {
    setLoading(true);
    setSuccess(false);
    if (dni === "" || words === "") {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    //Check that the format of words is the following: word.word.word
    if (words.split(".").length !== 3) {
      alert(
        "Please fill the words field with the correct format as in https://what3words.com/"
      );
      setLoading(false);
      return;
    }

    const data = `${dni}-${words}-${account.address}`;

    const hash = keccak256(stringToBytes(data));

    //const comparison_result = result.data === hash;
    //TODO: erase this
    const comparison_result = true;

    setTimeout(async () => {
      setLoading(false);
      if (comparison_result) {
        setSuccess(true);
      } else {
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
          setDni("");
          setWords("");
        }, 3000);
      }
    }, 3000);
  };

  if (success) return <ShowOwnership dni={dni} words={words} />;

  return (
    <div className="h-[50vh] flex justify-center items-center">
      <Form
        variant="check"
        dni_input={dni}
        setDni={setDni}
        words_input={words}
        setWords={setWords}
        submitFunction={() => check_registery()}
        check_failure={failure}
      />

      <LoadingModal openModal={loading} />
    </div>
  );
}
