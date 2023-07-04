import { Sidebar, Main } from "@/components";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const LayoutSpaces: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Main>
        <ModalChat />
        <div className="grid w-full grid-cols-[20%,80%]">
          <Sidebar />
          <div className="flex flex-col gap-[40px] seccion1-x py-[50px]">
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
        className="fixed bottom-[40px] right-[40px] bg-blue-700 text-white rounded-full bodyText font-semibold p-6 text-center"
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
