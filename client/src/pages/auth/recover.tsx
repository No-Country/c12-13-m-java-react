import { AuthLayout } from "@/components";
import { Input, GoogleButton } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
<>
    <Head>
    <title>Recuperar cuenta | Spaces</title>
  </Head>
    <AuthLayout>
      <h1 className="titulo-3 mb-6 font-normal">
        Recupera tu <span className="font-semibold">cuenta</span>
      </h1>
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          className="w-full"
        />
        <button type="submit" className="primaryButton">
          Recuperar
        </button>
      </form>
    </AuthLayout>
    </>
  );
}
