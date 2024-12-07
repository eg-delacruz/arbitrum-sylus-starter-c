"use client";

import { useState } from "react";
import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useRkAccountModal } from "@/lib/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import Image from "next/image";

import logo from "../assets/logo.png";

const ADDRESS = "0x0946e9c45504660e98464a7364be9f636d748ef4";

const ABI = parseAbi(["function hola_mundo() public returns (string)"]);

export default function Container() {
  const { openAccountModal } = useRkAccountModal();
  const { isConnected } = useAccount();
  const result = useReadContract({
    address: ADDRESS,
    functionName: "hola_mundo",
    abi: ABI,
  });

  const [input, setInput] = useState("");

  console.log({ result });
  const click = () => {};

  const connect = () => {
    openAccountModal();
  };

  return (
    <>
      <p>{result.data || "Loading..."}</p>
      <section className="max-w-2xl mt-12 mx-auto">
        <div className="w-full flex justify-center mt-24">
          <Image src={logo} alt="Logo" width={550} height={90} />
        </div>

        <br />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput("");
          }}
          className="flex flex-col items-center"
        >
          <input
            placeholder="DNI"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg shadow-xl"
          />
          <br />
          <input
            placeholder="Three words address"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg shadow-xl"
          />
          <button
            onClick={() => {
              connect();
            }}
            className="mt-4 p-4 bg-blue-500 text-white rounded-lg"
          >
            Connect
          </button>

          <button
            onClick={() => {
              click();
            }}
            className="mt-4 p-4 bg-blue-500 text-white rounded-lg"
          >
            Click
          </button>
        </form>
      </section>
    </>
  );
}
