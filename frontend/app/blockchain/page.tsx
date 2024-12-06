import Image from "next/image";
import Link from "next/link";

import logo from "../../assets/logo.png";

//Components
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Form from "./_components/form";

//TODO: protect route
export default function page() {
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
              <div className="h-[50vh] flex justify-center items-center">
                <Form />
              </div>
            </TabsContent>
            <TabsContent value="add">My publications</TabsContent>
          </Tabs>
        </section>
      </section>
    </>
  );
}
