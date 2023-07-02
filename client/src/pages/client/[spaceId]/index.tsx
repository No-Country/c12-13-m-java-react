import { useAppSelector } from "@/redux/hooks";
import { SpaceProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  RoomsList,
  MembersList,
} from "@/components";

export default function Space() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>
      <Main>
        <section className="flex h-screen flex-col gap-5 bg-gray-100 px-[60px] py-[60px] ">
          <Hero currentSpace={currentSpace} />
          <h1 className="text-2xl font-medium">Tus rooms</h1>
          <RoomsList />
        </section>
      </Main>
    </LayoutSpaces>
  );
}

type HeroProps = {
  currentSpace: SpaceProps;
};

function Hero({ currentSpace }: HeroProps) {
  return (
    <div className="flex items-center  gap-4 rounded-2xl bg-white p-7">
      <Image
        src={currentSpace?.coverImage}
        alt="SpaceCover"
        layout="fill"
        width="w-[80px]"
        height="w-[80px]"
        aspectRatio="aspect-[1/1]"
        rounded="rounded-[20px]"
      />
      <div className="flex w-full flex-row-reverse items-center justify-between">
        <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
          Invitar miembros
        </button>
        <div className="">
          <h1 className="text-2xl font-medium">{currentSpace?.name}</h1>
          <p className=" text-gray-900">{currentSpace?.description}</p>
          <MembersList members={currentSpace?.members} />
        </div>
      </div>
    </div>
  );
}
