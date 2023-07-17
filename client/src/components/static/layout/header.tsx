import { useAppSelector } from "@/redux/hooks";
import { HorizontalNav, ProfileAction } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactSVG } from "react-svg";

export default function Header() {
  const router = useRouter();

  const inPublicArea =
    router.pathname === "/" ||
    router.pathname === "/about" ||
    router.pathname.startsWith("/help");

  const inAuthArea = router.pathname.startsWith("/auth");

  const childrenTriggerPublic = (
    <Link href="/help" className="text-white">
      Ayuda
    </Link>
  );

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

  if (inAuthArea)
    return (
      <header className="fixed left-0 top-0 flex h-[97px] items-center justify-center ">
        <div className=" seccion1-x">
          <Logo type="white" />
        </div>
      </header>
    );
  else
    return (
      <header className="header h-[97px] ">
        <div className="headerInner ">
          <Logo type="normal" />
          <div className="absolute left-[50%]  hidden  w-max  translate-x-[-50%] lg:flex">
            {inPublicArea ? (
              <HorizontalNav items={itemsPublicNav} />
            ) : (
              <HorizontalNav items={itemsPublicNav} />
            )}
          </div>
          <ProfileAction />
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
    <ReactSVG
      onClick={() => router.push(auth.isLogged ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      className="aspect-[98/30] h-[30px] w-[98px] cursor-pointer fill-current text-white lg:text-white"
    />
  );
}
