"use client";

//Components
import { buttonVariants } from "@/components/ui/button";

type Props = {
  variant: "check" | "add";
  dni_input: string;
  setDni: (dni: string) => void;
  words_input: string;
  check_failure?: boolean;
  setWords: (words: string) => void;
  submitFunction: () => void;
};
export default function Form({
  variant,
  dni_input,
  setDni,
  words_input,
  check_failure = false,
  setWords,
  submitFunction,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitFunction();
      }}
      className="flex flex-col items-center mt-10 w-4/5 align-middle"
    >
      <input
        placeholder="DNI"
        type="text"
        value={dni_input}
        onChange={(e) => setDni(e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-lg shadow-xl"
      />
      <br />
      <input
        placeholder="Three words address"
        type="text"
        value={words_input}
        onChange={(e) => setWords(e.target.value)}
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
          {variant === "add" ? "Add ownership" : "Check ownership"}
        </button>
      </div>
      {check_failure && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-sm text-xl">
          The data does not match, this user is not the owner of the address
        </div>
      )}
    </form>
  );
}
