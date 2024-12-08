"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

//Assets
import logo from "../../assets/logo.png";

//Components
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AddReg from "./_components/add_reg";
import CheckReg from "./_components/check_reg";

//Hooks
import { useAccount } from "wagmi";

export default function Page() {
  const account = useAccount();

  //Protect route with next router:
  if (!account.isConnected) {
    return redirect("/");
  }

  return (
    <>
      <section className="max-w-2xl mt-12 mx-auto">
        <div className="w-full mt-10">
          <Link href={"/"}>
            <Image src={logo} alt="Logo" width={275} height={45} />
          </Link>
        </div>

        <section className="max-w-2xl mt-12 mx-auto">
          <Tabs defaultValue="check" className="w-full">
            <TabsList className="w-full p-0 border border-b-2 grid grid-cols-2">
              <TabsTrigger className="h-full" value="check">
                Check register
              </TabsTrigger>
              <TabsTrigger className="h-full" value="add">
                Add register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="check">
              <CheckReg account={account} />
            </TabsContent>
            <TabsContent value="add">
              <AddReg account={account} />
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </>
  );
}
