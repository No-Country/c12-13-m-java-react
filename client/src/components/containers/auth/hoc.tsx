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
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  const userId = session?.current?.id || (userIdQy ?? "");

  const verifySession = async (data: AuthProps) => {
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
      console.log("verifData", verifData);
      if (verifData.verifySession === true) {
        console.log("Se verifico la sesion", userId);
        dispatch(setAuth(data));
        await dispatch(setSession(userId as string));
      } else {
        dispatch(resetReducer());
        console.log("No se pudo verificar la sesión", data.isLogged, userId);
      }
    } else {
      console.log("No se pudo verificar la sesión", data.isLogged, userId);
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
    console.log("authObj",  statusQy, loginMethodQy, sessionQy);
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
        console.log("No se cumple ninguna condicion");
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

// const getSessionData = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_AFTER_LOGIN,
//       variables: { id: userId },
//     });
//     console.log("data", data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
