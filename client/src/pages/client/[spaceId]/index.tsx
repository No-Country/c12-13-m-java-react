import { useAppSelector } from "@/redux/hooks";
import {
  LayoutSpaces,
  RoomsList,
  SpaceInvite,
  HeroSpaceArea,
} from "@/components";
import Head from "next/head";

export default function Space() {
  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

  return (
    <>
      <Head>
        <title>Espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Invitar a un amigo"
          triggerIsAdmin={true}
          bgImageVisibleOnDesktop={true}
        >
          <SpaceInvite />
        </HeroSpaceArea>
        <section className=" flex flex-col gap-10 ">
          <RoomsList />
        </section>
      </LayoutSpaces>
    </>
  );
}
