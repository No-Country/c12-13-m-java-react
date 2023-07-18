import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";
import Link from "next/link";
import { AuthClass, UserProps } from "@/utils/types/client";

export default function ProfileAction() {
  const { session:{current:Ssession}, auth:sAuth } = useAppSelector((state) => state.authSession);
  const session = UserProps.deserialize(Ssession);
  const auth = AuthClass.deserialize(sAuth);

  const itemsNav = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Cuenta",
      href: "/client/account",
    },
    {
      name: "Espacios",
      href: "/client",
    },
    {
      name: "Cerrar sesión",
      href: "/auth/logout",
    },
  ];

  const childrenTrigger = (
    <>
      <Image
        src={session?.getProfileImage()}
        alt="ProfileImage"
        layout="fill"
        width="w-[40px]"
        height="w-[40px]"
        aspectRatio="aspect-[1/1]"
        rounded="rounded-[20px]"
      />
      <p className="bodyText hidden font-medium text-white lg:flex">
        {session?.getFullName()}
      </p>
    </>
  );

  return (
    <>
      {auth.getIsLogged() ? (
        <Popover childrenTrigger={childrenTrigger}>
          <VerticalNav items={itemsNav} />
        </Popover>
      ) : (
        <button className="button terceryButton">
          <Link href={"/auth"}>Iniciar sesión</Link>
        </button>
      )}
    </>
  );
}
