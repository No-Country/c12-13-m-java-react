import { Sidebar, Main } from "@/components";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  type: "client" | "account";
};

const LayoutSpaces: React.FC<Props> = ({ children, type = "client" }) => {
  return (
    <>
      <Main>
        {type === "client" && <ModalChat />}

        <div className="grid w-full grid-cols-[20%,80%]">
          <Sidebar type={type} />
          <div className="seccion1-x flex flex-col gap-[30px] py-[50px]">
            {children}
          </div>
        </div>
      </Main>
    </>
  );
};

function ModalChat() {
  const [chatVisibility, setChatVisibility] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        className="bodyText fixed bottom-[40px] right-[40px] rounded-full bg-blue-700 p-6 text-center font-semibold text-white"
        onClick={() => setChatVisibility(!chatVisibility)}
      >
        Chat
      </button>
      {chatVisibility && (
        <div
          id="chat-box"
          className="fixed bottom-[40px] right-[40px]  min-h-[450px] min-w-[250px] bg-white p-4 shadow-xl"
        >
          <button
            onClick={() => setChatVisibility(!chatVisibility)}
            className="absolute right-0 top-0"
          >
            Cerrar
          </button>
          soy chat box
        </div>
      )}
    </div>
  );
}

export default LayoutSpaces;
