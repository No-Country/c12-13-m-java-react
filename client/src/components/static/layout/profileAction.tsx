import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav, HorizontalNav } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactSVG } from "react-svg";

export default function ProfileAction() {
  const { session, auth } = useAppSelector((state) => state.authSession);

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
        src={session?.current?.profileImage}
        alt="ProfileImage"
        layout="fill"
        width="w-[40px]"
        height="w-[40px]"
        aspectRatio="aspect-[1/1]"
        rounded="rounded-[20px]"
      />
      <p className="bodyText hidden font-medium text-white lg:flex">
        {session?.current?.firstName + " " + session?.current?.lastName}
      </p>
    </>
  );

  return (
    <>
      {auth.isLogged ? (
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
