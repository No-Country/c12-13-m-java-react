import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";

export default function Header() {
  const { session } = useAppSelector((state) => state.authSession);

  const childrenTrigger = (
    <>
      <p className="text-black">Hola, {session?.current?.firstName}</p>
      <Image
        src={session?.current?.profileImage}
        alt="ProfileImage"
        layout="fill"
        width="w-[40px]"
        height="w-[40px]"
        aspectRatio="aspect-[1/1]"
        rounded="rounded-[20px]"
      />
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
    <header className="flex h-[80px] w-full items-center justify-between bg-white  px-9 ">
      <h1 className="text-2xl font-bold text-black">Spaces App</h1>
      <Popover childrenTrigger={childrenTrigger}>
        <VerticalNav items={itemsNav} />
      </Popover>
    </header>
  );
}
