import { Sidebar, Main, HeaderSpaceArea } from "@/components";
import { ReactNode, useEffect, useState, useMemo } from "react";
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
  
    const handleSendMessage = (e: any) => {
      e.preventDefault();
      const message = e.target.message.value;
      dispatch(sendMessage({ message }));
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
            className="fixed bottom-[40px] right-[40px]  flex min-h-[450px]  min-w-[250px] flex-col bg-white p-4 shadow-xl"
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