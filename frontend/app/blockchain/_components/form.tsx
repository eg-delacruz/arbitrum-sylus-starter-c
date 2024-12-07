"use client";

import { useState } from "react";

//Components
import { buttonVariants } from "@/components/ui/button";

export default function Form() {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInput("");
      }}
      className="flex flex-col items-center mt-10 w-4/5 align-middle"
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
      <div className="mt-4">
        <button
          className={buttonVariants({
            variant: "default",
            size: "default",
          })}
          type="submit"
        >
          Check ownership
        </button>
      </div>
    </form>
  );
}
