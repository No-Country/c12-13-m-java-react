import { useState } from "react";
import NextImage from "next/image";

type TextToInputProps = {
  text: string;
  title: string;
  inputType?: "text" | "number" | "email" | "password" | "date" | "file";
  inputTag: "input" | "textarea" | "image" | "file";
  setResultText: (text: string) => void;
};

export default function TextToInput({
  text,
  setResultText,
  title,
  inputType,
  inputTag,
}: TextToInputProps) {
  const [editing, setEditing] = useState<boolean>(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    setEditing(false);
    setResultText(e.target.data.value);
    console.log("result", e.target.data.value);
  };

  return (
    <div>
      <p className="bodyText text-blue-700">{title}</p>

      {editing ? (
        <>
          <form className="w-full" onSubmit={(e) => handleSave(e)}>
            {inputTag === "input" ? (
              <input
                type="text"
                name="data"
                className="w-full font-normal"
                defaultValue={text}
                required
              />
            ) : inputTag === "textarea" ? (
              <textarea
                name="data"
                className="w-full font-normal"
                defaultValue={text}
                required
              />
            ) : (
              <input
                type="file"
                name="data"
                className="w-full font-normal"
                required
              />
            )}
            <div className="mt-1 flex gap-1">
              <button
                className="terceryButton text-red-700"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="terceryButton">
                Guardar
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-start justify-start gap-2">
            {inputTag !== "image" ? (
              <p className="bodyText mb-1 w-max font-normal text-black">
                {text}
              </p>
            ) : (
              <div className="relative h-[200px] w-[200px] ">
                <NextImage
                  src={text}
                  alt="SpaceCover"
                  layout="fill"
                  className="aspect-square rounded-[20px]"
                />
              </div>
            )}
            <NextImage
              src="/icon/pencil.svg"
              alt="edit"
              width={16}
              height={16}
              className="cursor-pointer pt-1"
              onClick={() => setEditing(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}
