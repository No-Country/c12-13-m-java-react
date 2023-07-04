import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";
import { useRouter } from "next/router";

export default function Header() {
  const { session } = useAppSelector((state) => state.authSession);

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
      <p className="bodyText font-medium text-black">
        {session?.current?.firstName + " " + session?.current?.lastName}
      </p>
    </>
  );

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

  return (
    <header className="header">
      <div className="headerInner ">
        <Logo />
        <Popover childrenTrigger={childrenTrigger}>
          <VerticalNav items={itemsNav} />
        </Popover>
      </div>
    </header>
  );
}

function Logo() {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authSession);

  return (
    <Image
      onClick={() => router.push(auth.isLogged ? "/client" : "/")}
      src="/icon/logo.svg"
      alt="Logo"
      layout="fill"
      width="w-[98px]"
      height="w-[30px]"
      aspectRatio="aspect-[98/30]"
      containerClassName="cursor-pointer"
    />
  );
}
