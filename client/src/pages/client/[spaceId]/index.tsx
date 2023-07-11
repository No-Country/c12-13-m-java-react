import { useAppSelector } from "@/redux/hooks";
import { SpaceProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  RoomsList,
  ModalTrigger,
  SpaceInvite,
  ListTopArea,
  HeroSpaceArea,
  RoomCreateForm,
  Hr,
} from "@/components";
import Head from "next/head";

export default function Space() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <>
      <Head>
        <title>Espacio | Spaces</title>
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Invitar a un amigo"
          triggerIsAdmin={true}
        >
          <SpaceInvite />
        </HeroSpaceArea>
        <Hr />
        <section className=" flex flex-col gap-10 ">
          <div className=" flex flex-col gap-6">
            <ListTopArea
              title="Mis rooms"
              triggerIsAdmin={true}
              description="Organiza tu espacio en pequeñas salas"
              buttonText="Crear nuevo room"
              triggerContent={<RoomCreateForm />}
            />
            <RoomsList />
          </div>
        </section>
      </LayoutSpaces>
    </>
  );
}
