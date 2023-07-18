import {
  Input,
  LayoutSpaces,
  HeroAccountArea,
  AccountSection,
} from "@/components";
import Head from "next/head";

export default function AccountPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <Head>
        <title>Mi cuenta | Spaces</title>
      </Head>

      <LayoutSpaces type="account">
        <HeroAccountArea />
        <AccountSection title="Mi cuenta" description="Edita tu perfil">
          <form
            onSubmit={handleSubmit}
            className=" grid  w-full grid-cols-2 gap-6"
          >
            <div id="col1" className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                className="w-full"
              />

              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                className="w-full"
              />
              <Input
                type="file"
                name="profileImage"
                label="Foto de perfil"
                placeholder="Foto de perfil"
                className="w-full"
              />
              <Input
                type="password"
                name="password"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                className="w-full"
              />
            </div>
            <div id="col2" className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="Apellido"
                className="w-full"
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                className="w-full"
              />
                            <Input
                type="file"
                name="coverImage"
                label="Foto de portada"
                placeholder="Foto de portada"
                className="w-full"
              />
            </div>
            <button type="submit" className="primaryButton w-40">
              Guardar
            </button>
          </form>
        </AccountSection>
      </LayoutSpaces>
    </>
  );
}
