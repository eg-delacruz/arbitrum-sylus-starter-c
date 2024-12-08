type Props = {
  dni: string;
  words: string;
};

export default function ShowOwnership({ dni, words }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <p>
        The user with DNI <strong>{dni}</strong> is the owner of the 3 x 3
        meters square assigned the words <strong>{words}</strong>. You can check
        the exact location by clicking the following link:{" "}
        <a
          href={`https://what3words.com/${words}`}
          className="underline text-blue-600"
        >
          https://what3words.com/{words}
        </a>
      </p>
    </div>
  );
}
