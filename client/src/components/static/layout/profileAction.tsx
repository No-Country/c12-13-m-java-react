import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";
import Link from "next/link";
import { AuthClass, UserProps } from "@/utils/types/client";

type ProfileActionProps = {
  textColor?: string;
};

export default function ProfileAction({
  textColor = "text-white",
}: ProfileActionProps) {
  const {
    session: { current: Ssession },
    auth: sAuth,
  } = useAppSelector((state) => state.authSession);
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
      {session?.getFullName().length > 2 && (
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
          <p className={`bodyText hidden font-medium ${textColor} lg:flex`}>
            {session?.getFullName()}
          </p>
        </>
      )}
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
