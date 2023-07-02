import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Main, Image } from "@/components";

export default function Header() {
  const { session } = useAppSelector((state) => state.authSession);

  return (
    <header className="flex h-[80px] w-full items-center justify-between bg-white  px-9 ">
      <h1 className="text-2xl font-bold text-black">Spaces App</h1>
      <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
}
