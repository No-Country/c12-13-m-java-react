import {
  Input,
  LayoutSpaces,
  HeroAccountArea,
  AccountSection,
} from "@/components";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editUser } from "@/redux/slices/authSession";
import { useState } from "react";
import { UserProps } from "@/utils/types/client";

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const {current:sCurrent} = useAppSelector((state) => state.authSession.session);
  const current =UserProps.deserialize(sCurrent);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form:any = {
      firstName: e?.currentTarget?.firstName?.value,
      lastName: e?.currentTarget?.lastName?.value,
      username: e?.currentTarget?.username?.value,
      email: e?.currentTarget?.email?.value,
      profileImage: e?.currentTarget?.profileImage?.files[0],
      filenamePi: e?.currentTarget?.profileImage?.files[0]?.name,
      coverImage: e?.currentTarget?.coverImage?.files[0],
      filenameCi: e?.currentTarget?.coverImage?.files[0]?.name,
    };
if(Object.keys(form).length === 0) return;
    console.log(form, Object.keys(form).length);
    dispatch(editUser(form));

    //reset form
    e.currentTarget.reset();
    form = {};

  };

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
                defaultValue={current?.getFirstName()}
              />

              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                className="w-full"
                defaultValue={current?.getEmail()}
              />
              <Input
                type="file"
                name="profileImage"
                label="Foto de perfil"
                placeholder="Foto de perfil"
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
                defaultValue={current?.getLastName()}
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                className="w-full"
                defaultValue={current?.getUsername()}
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
