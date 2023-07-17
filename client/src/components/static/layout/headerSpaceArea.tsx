import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import { useAppSelector } from "@/redux/hooks";
import { ProfileAction } from "@/components";

export default function HeaderSpaceArea() {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-[97px] w-full items-center justify-center lg:hidden ">
      <div className="seccion1-x flex w-full items-center justify-between">
        <Logo type="normal" />
        <ProfileAction />
      </div>
    </header>
  );
}

function Logo({ type }: any) {
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
