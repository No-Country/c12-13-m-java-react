// /client?loginMethod=google&id=1234567890&status=ok&session=12345
// hace falta crear la ruta verify
import { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { setAuth, setSession, resetReducer } from "@/redux/slices/authSession";
import { AuthClass, AuthProps } from "@/utils/types/client/authSession";
import { VERIFY_SESSION } from "@/graphql/queries";
import client from "@/graphql/apollo-client";

type Props = {
  children: ReactNode;
};

const HOC: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    loginMethod: loginMethodQy,
    id: userIdQy,
    status: statusQy,
    session: sessionQy,
  } = router.query;
  const { session, auth } = useAppSelector((state) => state.authSession);
  const { currentSpace } = useAppSelector((state) => state.client.spaces.spaces);
  const userId = session?.current?.id || (userIdQy ?? "");

  const verifySession = async (data: AuthProps) => {
    console.log("verifySession", data);
    if (data.isLogged && userId) {
      const {
        data: verifData,
        error,
        loading,
      } = await client.query({
        query: VERIFY_SESSION,
        variables: {
          userId: userId,
        },
      });
    
      if (verifData.verifySession === true) {
      
        dispatch(setAuth(data));
        await dispatch(setSession(userId as string));
      } else {
        console.log("error", verifData);
        alert("No se pudo verificar la sesión");
        dispatch(resetReducer());
    
      }
    } else {
  
      alert("No se pudo verificar la sesión");
    }
  };

  const setAuthFn = async () => {
    const authObj = new AuthClass(
      statusQy === "ok" ? true : false,
      loginMethodQy as string,
      sessionQy as string,
      {
        googleSessionID:
          loginMethodQy === "google" ? (sessionQy as string) : "",
      }
    );

    verifySession(authObj);
  };

  const systemHoc = () => {
    if (router.pathname.startsWith("/client")) {
      if (auth?.isLogged) {
        verifySession(auth);
      } else if (
        !auth?.isLogged &&
        loginMethodQy &&
        userIdQy &&
        statusQy &&
        sessionQy
      ) {
        setAuthFn();
      } else {
     
        alert("No se cumple ninguna condicion");
        router.push("/");
      }
    } else if (router.pathname.startsWith("/auth")) {
      if (auth?.isLogged) {
        router.push("/client");
      }
    }
  };

  const delayedSystemStart = useMemo(
    () => debounce(() => systemHoc(), 500),
    [
      router.pathname,
      userId,
      auth?.isLogged,
      loginMethodQy,
      userIdQy,
      statusQy,
      router.query,
      session?.current?.id,
    ]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedSystemStart.cancel();
    };
    delayedSystemStart();
    return cancelDebounce;
  }, [delayedSystemStart]);

  // Rutas protegidas
  if (router?.pathname.startsWith("/client") && !auth?.isLogged) {
    return null;
  }

  return <main>{children}</main>;
};

export default HOC;
