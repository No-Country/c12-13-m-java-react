// /client?loginMethod=google&id=1234567890&status=ok&session=12345
// hace falta crear la ruta verify
import { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { setAuth, setSession } from "@/redux/slices/authSession";
import { AuthClass, AuthProps } from "@/utils/types/client/authSession";

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
  const {currentSpace} = useAppSelector((state) => state.client.spaces);
  const userId = session?.current?.id || (userIdQy ?? "");

  const verifySession = async (data: AuthProps) => {
    //deberiamos hacer una peticion al servidor para verificar la sesion en la base de datos
    if (data.isLogged && userId) {
      console.log("Se verifico la sesion", userId);
      dispatch(setAuth(data));
      await dispatch(setSession(userId as string));
    } else {
      alert("No se pudo verificar la sesión");
      console.log("No se pudo verificar la sesión", data.isLogged, userId);
    }
  };

  const setAuthFn = async () => {
    const authObj = new AuthClass(
      statusQy === "ok" ? true : false,
      loginMethodQy as string,
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
        console.log("No se cumple ninguna condicion");
        alert("No se cumple ninguna condicion");
        router.push("/");
      }
    }
    else if (router.pathname.startsWith("/auth")) {
      if(auth?.isLogged){
        router.push("/client")
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
