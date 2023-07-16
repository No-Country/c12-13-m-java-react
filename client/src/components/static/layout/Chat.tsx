import { Sidebar, Main, HeaderSpaceArea, Input, Hr } from "@/components";
import { ReactNode, useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsAdminOfCurrentSpace,
  sendMessage,
  addMessage,
} from "@/redux/slices/client/spaces/spaces";
import { debounce } from "lodash";
import Image from "next/image";
import { useSubscription } from "@apollo/client";
import {
  NOTIFY_TASK_CHANGED,
  NOTIFY_MESSAGE_CREATED,
} from "@/graphql/subscriptions";

export default function ModalChat() {
  const dispatch = useAppDispatch();
  const [chatVisibility, setChatVisibility] = useState(false);
  const { currentSpace, userIsAdminOfCurrentSpace, currentSpaceChat } =
    useAppSelector((state) => state.client.spaces.spaces);
  const containerRef = useRef<any>(null);
  const { id } = useAppSelector((state) => state.authSession.session.current);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const message = e.target.message.value;
    dispatch(sendMessage({ message }));
    e.target.message.value = "";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      console.log("scroll", container);
      container.scrollTop = container.scrollHeight; // Desplaza automáticamente hacia abajo al cargar la página

      // Opcional: Desplaza automáticamente hacia abajo cuando se agreguen nuevos elementos
      // Lógica para agregar nuevos elementos al contenedor...

      // Desplaza automáticamente hacia abajo después de agregar nuevos elementos
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col  ">
      <button
        className="bodyText fixed bottom-[40px] right-[40px] z-[20] rounded-full bg-blue-700 p-6 text-center font-semibold text-white"
        onClick={() => setChatVisibility(!chatVisibility)}
      >
        Chat
      </button>
      {chatVisibility && (
        <div
          id="chat-box"
          className="fixed bottom-[40px] right-[40px] z-[20]  flex max-h-[450px] min-h-[450px] min-w-[350px]  max-w-[350px] flex-col rounded-2xl bg-white p-4 shadow-lg"
        >
          <div className="flex items-center justify-between pb-4 gap-2">
            <h3 className="bodyText font-semibold">{currentSpace.name}</h3>
            <Image
              src="/icon/cross.svg"
              width={16}
              height={16}
              alt="profileImage"
              className=" z-10 aspect-square cursor-pointer"
              onClick={() => setChatVisibility(!chatVisibility)}
            />
          </div>

          <div className="relative  flex flex-grow overflow-hidden">
            <div className="flex max-w-full flex-col justify-between gap-2  ">
              <div
                className=" flex max-w-full flex-col gap-3 overflow-scroll pb-3 "
                ref={containerRef}
              >
                {Array.isArray(currentSpaceChat.messages) &&
                  currentSpaceChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${
                        id == message.fromUser.id
                          ? "flex-row"
                          : "flex-row-reverse"
                      } `}
                    >
                      <Image
                        src={message.fromUser.profileImage}
                        width={35}
                        height={35}
                        alt="profileImage"
                        className="aspect-square rounded-full object-cover"
                      />
                      <div className="flex max-w-full flex-col items-start gap-[2px] ">
                        <p className=" max-w-full  rounded-2xl bg-blue-100 px-4 py-1  text-sm text-blue-700">
                          {message.content}
                        </p>
                        <p
                          className={`w-full text-xs text-black ${
                            id == message.fromUser.id
                              ? "text-left"
                              : "text-right"
                          }`}
                        >
                          {message.fromUser.firstName +
                            " " +
                            message.fromUser.lastName}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Escribe un mensaje"
                  name="message"
                  label=""
                  className="w-full"
                  labelClass="w-full"
                />
                <button
                  type="submit"
                  className="primaryButton smalltext px-3 py-2"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
