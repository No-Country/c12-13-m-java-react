import {
  Sidebar,
  Main,
  HeaderSpaceArea,
  Chat,
  CircularLoader,
} from "@/components";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/redux/slices/client/spaces/spaces";
import { useSubscription } from "@apollo/client";
import { NOTIFY_MESSAGE_CREATED } from "@/graphql/subscriptions";

type Props = {
  children: ReactNode;
  type: "client" | "account";
};

const LayoutSpaces: React.FC<Props> = ({ children, type = "client" }) => {
  const dispatch = useAppDispatch();
  const { currentSpaceChat, spaceLoading } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const { data: datachange } = useSubscription(NOTIFY_MESSAGE_CREATED, {
    variables: { chatId: currentSpaceChat?.id },
  });

  useEffect(() => {
    if (datachange?.notifyMessageCreated) {
      dispatch(addMessage(datachange?.notifyMessageCreated));
    }
  }, [datachange]);

  return (
    <>
      <Main>
        {spaceLoading ? (
          <SpaceLoader />
        ) : (
          <>
            {type === "client" && <Chat />}
            <HeaderSpaceArea />
            <div className="layoutSpContainer">
              <Sidebar type={type} />
              <div className="layoutSpChildren">{children}</div>
            </div>
          </>
        )}
      </Main>
    </>
  );
};

export default LayoutSpaces;

function SpaceLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-4">
        <CircularLoader />
        <div>
          <p className="subtitulo">Cargando tu espacio</p>
          <p className="text-sm font-light">Solo un momento mas...</p>
        </div>
      </div>
    </div>
  );
}
