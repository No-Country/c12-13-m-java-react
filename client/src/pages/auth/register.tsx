import { AuthLayout } from "@/components";
import { Input, GoogleButton } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import userRegister from "@/hooks/useRegister";
import { set } from "lodash";
import { useAppDispatch } from "@/redux/hooks";
import { register } from "@/redux/slices/authSession";
export default function Home() {
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/client");
  };
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({});
  const onClick = () => {
    setStep(2);
  };

  const {
    error,
    handleFirstName,
    handleLastName,
    handleUserName,
    handleConfirmPassword,
    handleEmail,
    handlePassword,

  } = userRegister()

  const dispacth = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
   // router.push("/client");
   dispacth(register(form))
  };

  return (
    <>
      <Head>
        <title>Registrarse | Spaces</title>
      </Head>
      <AuthLayout>
        <h1 className="titulo-3 mb-6 font-normal">
          Registrate en <span className="font-semibold">Spaces</span>
        </h1>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <div id="step1" className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                onChange={handleChange}
                className="w-full"
                error={error.firstName}
                onChange={handleFirstName}
              />
              <Input
                type="text"
                name="lastName"
                label="Apellidos"
                onChange={handleChange}
                placeholder="Apellidos"
                className="w-full"
                error={error.lastName}
                onChange={handleLastName}
              />
              <button type="button" className="primaryButton" onClick={onClick}>
                Siguiente
              </button>
            </div>
          )}
          {step === 2 && (
            <div id="step2" className="flex w-full flex-col gap-4">
              <Input
                type="email"
                onChange={handleChange}
                name="email"
                label="Correo electrónico"
                placeholder="Correo electrónico"
                className="w-full"
                error={error.email}
                onChange={handleEmail}
              />
              <Input
                type="text"
                name="userName"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                className="w-full"
                error={error.userName}
                onChange={handleUserName}
              />
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                label="Contraseña"
                placeholder="Contraseña"
                error={error.password}
                onChange={handlePassword}
              />
               <Input
                type="password"
                name="password2"
                label="Contraseña"
                placeholder="Contraseña"
                onChange={handlePassword}
                
              />
              <button type="submit" className="primaryButton">
                Registrarse
              </button>
            </div>
          )}
        </form>
        <hr className="my-6 w-full" />
        <GoogleButton />
        <p className="mt-6 w-full text-center font-light">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth" className="font-medium text-blue-700">
            Ingresar
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
