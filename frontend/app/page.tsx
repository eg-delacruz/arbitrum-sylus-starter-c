"use client";

import Link from "next/link";
import { useState } from "react";
import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useRkAccountModal } from "@/lib/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import Image from "next/image";

import logo from "../assets/logo.png";
import grama from "../assets/grama.svg";

//Components
import { buttonVariants } from "@/components/ui/button";

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

  console.log({ result });

  const connect = () => {
    openAccountModal();
  };

  return (
    <>
      <section className="max-w-2xl mx-auto h-[calc(100vh-91px)] flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <Image src={logo} alt="Logo" width={550} height={90} />
        </div>

        <br />

        <div className="flex justify-center">
          {isConnected ? (
            <div className="flex gap-4">
              <Link
                href={"/blockchain"}
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                Start
              </Link>
              <button
                className={buttonVariants({
                  variant: "secondary",
                  size: "default",
                })}
                onClick={connect}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
            >
              Connect
            </button>
          )}
        </div>

        <div className="mt-10">
          <h4 className="text-center font-bold text-xl">
            {'"🌍 Own Your Land, Own Your Legacy – Secured on the Blockchain"'}
            <br />
          </h4>
          <p className="mt-8">
            Say goodbye to paper trails and hello to permanent proof. Our
            cutting-edge platform puts your land ownership on the blockchain —
            immutable, transparent, and always within reach. No middlemen, no
            doubts, just pure peace of mind. Build your future on a foundation
            that lasts forever.
          </p>
        </div>
      </section>
      <div>
        <div className="flex justify-center">
          <Image src={grama} alt="Grama" width={40} height={40} />
        </div>
        <div className="h-12 bg-[#582F0E] flex justify-center items-center">
          <p className="text-white text-center text-sm">
            Developed by <strong>jtivan-r</strong> | <strong>ingjimen</strong> |{" "}
            <strong>erde-la-</strong>
          </p>
        </div>
      </div>
    </>
  );
}
