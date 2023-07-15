import { Sidebar, Main } from "@/components";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsAdminOfCurrentSpace, sendMessage, addMessage } from "@/redux/slices/client/spaces/spaces";
import { debounce } from "lodash";
import Image from "next/image";
import { useSubscription } from "@apollo/client";
import { NOTIFY_TASK_CHANGED, NOTIFY_MESSAGE_CREATED } from "@/graphql/subscriptions";

type Props = {
  children: ReactNode;
  type: "client" | "account";
};

const LayoutSpaces: React.FC<Props> = ({ children, type = "client" }) => {
  const { currentSpace, userIsAdminOfCurrentSpace, currentSpaceChat } =
    useAppSelector((state) => state.client.spaces.spaces);
  const { id } = useAppSelector((state) => state.authSession.session.current);
  const [isAdmin, setIsAdmin] = useState<any>();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: datachange } = useSubscription(NOTIFY_MESSAGE_CREATED, {
    variables: { chatId: currentSpaceChat.id },
  });

  useEffect(() => {
    if (datachange?.notifyMessageCreated) {
      dispatch(addMessage(datachange?.notifyMessageCreated));
    }
  }
  , [datachange]);

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
  const dispatch = useAppDispatch();
  const [chatVisibility, setChatVisibility] = useState(false);
  const { currentSpace, userIsAdminOfCurrentSpace, currentSpaceChat } =
    useAppSelector((state) => state.client.spaces.spaces);

    const handleSendMessage = (e: any) => {
      e.preventDefault();
      const message = e.target.message.value;
      dispatch(sendMessage({ message}));
      e.target.message.value = "";
    };
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
          className="fixed bottom-[40px] right-[40px] z-50 flex min-h-[450px]  min-w-[250px] flex-col bg-white p-4 shadow-xl"
        >
          <button
            onClick={() => setChatVisibility(!chatVisibility)}
            className="absolute right-0 top-0"
          >
            Cerrar
          </button>
          <div className="relative  flex flex-grow bg-red-700">
            <div className="flex  flex-grow flex-col justify-between gap-2 bg-violet-600">
              <div className="flex-grow bg-yellow-600">
                {Array.isArray(currentSpaceChat.messages) &&
                  currentSpaceChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className="grid grid-cols-[30px,100%] gap-2 "
                    >
                      <Image
                        src={message.fromUser.profileImage}
                        width={30}
                        height={30}
                        alt="profileImage"
                        className="aspect-square rounded-full object-cover"
                      />
                      <p>{message.content}</p>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
              <input type="text" placeholder="mensaje" name="message" />
              <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutSpaces;
