import { AuthLayout } from "@/components";
import { Input, GoogleButton } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSession";
import useRegister from "@/hooks/useRegister";
export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {data,error,handleEmail,handlePassword} = useRegister()

  const {email,password} = data


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
dispatch(login({email,password}));
  };

  return (
    <>
      <Head>
        <title>Iniciar sesion | Spaces</title>
      </Head>
      <AuthLayout>
        <h1 className="titulo-3 mb-6 font-normal">
          Hey, bienvenido <span className="font-semibold">de nuevo</span>
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            className="w-full"
            onChange={handleEmail}
            error={error.email}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
            onChange={handlePassword}
            error={error.password}
          />
          <p className=" w-full text-center font-light">
            ¿No recuerdas tu contraseña?{" "}
            <Link href="/auth/recover" className="font-medium text-blue-700">
              Recuperar
            </Link>
          </p>
          <button type="submit" className="primaryButton">
            Ingresar
          </button>
        </form>
        <hr className="my-6 w-full" />
        <GoogleButton />
        <p className="mt-6 w-full text-center font-light">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="font-medium text-blue-700">
            Regístrate
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
