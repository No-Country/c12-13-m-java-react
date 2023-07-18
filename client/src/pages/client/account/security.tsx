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
        <title>Seguridad | Spaces</title>
      </Head>

      <LayoutSpaces type="account">
        <HeroAccountArea />
        <AccountSection title="Seguridad" description="Edita tu contraseña">
          <form
            onSubmit={handleSubmit}
            className=" grid  w-full grid-cols-2 gap-4"
          >
            <div id="col1" className="flex w-full flex-col gap-4">
              <Input
                type="password"
                name="password"
                label="Contraseña actual"
                placeholder="Contraseña actual"
                className="w-full"
              />
            </div>
            <div id="col2" className="flex w-full flex-col gap-4">
              <Input
             type="password"
                name="newPassword"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
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
