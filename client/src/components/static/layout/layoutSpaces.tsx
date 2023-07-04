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
        <div className="grid grid-cols-[20%,80%] w-full">
          <Sidebar />
          {children}
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
        className="fixed bottom-[40px] right-[40px] bg-blue-600 p-6 text-center"
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
