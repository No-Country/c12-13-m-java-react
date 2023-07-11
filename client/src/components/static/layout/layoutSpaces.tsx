import { Sidebar, Main } from "@/components";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsAdminOfCurrentSpace } from "@/redux/slices/client/spaces/spaces";
import { debounce } from "lodash";

type Props = {
  children: ReactNode;
  type: "client" | "account";
};

const LayoutSpaces: React.FC<Props> = ({ children, type = "client" }) => {
  const { currentSpace, userIsAdminOfCurrentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const { id } = useAppSelector((state) => state.authSession.session.current);
  const [isAdmin, setIsAdmin] = useState<any>();

  const router = useRouter();
  const dispatch = useAppDispatch();

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
