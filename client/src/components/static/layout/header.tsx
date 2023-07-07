import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const { session, auth } = useAppSelector((state) => state.authSession);
  const router = useRouter();

  const inPublicArea =
    router.pathname === "/" ||
    router.pathname === "/about" ||
    router.pathname.startsWith("/help");

const inAuthArea = router.pathname.startsWith("/auth");

  const childrenTrigger = (
    <>

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
    
        <>
      
        </>
    
    </>
  );

  const childrenTriggerPublic = (
    <>
      <Link href="/help">Ayuda</Link>
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

  const itemsPublicNav = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Sobre nosotros",
      href: "/about",
    },
    {
      name: "Ayuda",
      href: "/help",
      hasPopover: true,
      childrenTrigger: childrenTriggerPublic,
      itemsNav: [
        {
          name: "Inicio",
          href: "/help",
        },
        {
          name: "Términos",
          href: "/help/terms",
        },
        {
          name: "Privacidad",
          href: "/help/privacy",
        },
      ],
    },
  ];


  if (inAuthArea) return (
    <header className="fixed top-0 left-0 z-50 flex justify-center items-center h-[97px] ">
      <div className=" seccion1-x">
        <Logo type="white" />
      </div>
    </header>
  )


else return (
    <header className="header h-[97px] ">
      <div className="headerInner ">
        <Logo />
        <div className="absolute left-[50%]  flex  w-max translate-x-[-50%]">
          {inPublicArea ? (
            <Nav items={itemsPublicNav} />
          ) : (
            <Nav items={itemsPublicNav} />
          )}
        </div>
        {
          auth.isLogged ? 
          (
            <Popover childrenTrigger={childrenTrigger}>
            <VerticalNav items={itemsNav} />
          </Popover>
          ) : (
            <button className="button terceryButton">
            <Link href={"/auth"}>Iniciar sesión</Link>
              </button>
          )
        }
 
      </div>
    </header>
  );
}

type LogoProps = {
  type?: "white" | "normal";
};

function Logo({ type }: LogoProps) {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authSession);

  return (
    <Image
      onClick={() => router.push(auth.isLogged ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      alt="Logo"
      layout="fill"
      width="w-[98px]"
      height="w-[30px]"
      aspectRatio="aspect-[98/30]"
      containerClassName="cursor-pointer"
    />
  );
}

type VerticalNavProps = {
  items: any[];
};

function Nav({ items }: VerticalNavProps) {
  return (
    <nav className="flex gap-8">
      {items.map((item, index) => (
        <>
          {item.hasPopover ? (
            <Popover childrenTrigger={item.childrenTrigger}>
              <VerticalNav items={item.itemsNav} />
            </Popover>
          ) : (
            <Link href={item.href}>{item.name}</Link>
          )}
        </>
      ))}
    </nav>
  );
}
