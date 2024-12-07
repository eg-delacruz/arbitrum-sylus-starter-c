import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState("");

  return (
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
          console.log("click");
        }}
        className="mt-4 p-4 bg-blue-500 text-white rounded-lg"
      >
        Connect
      </button>
    </form>
  );
}
