import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
  HeroSpaceArea,
  Hr,
  ListTopArea,
} from "@/components";
import Head from "next/head";

export default function Members() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  return (
    <>
         <Head>
        <title>Miembros del espacio | Spaces</title>
      </Head>
    <LayoutSpaces type="client" >
      <HeroSpaceArea
        current={currentSpace}
        type="space"
        controls={false}
        triggerText="Editar"
      />
      <Hr hasPadding={false} />
      <section className=" flex flex-col gap-6">
        <ListTopArea
          title="Miembros"
          description="Administra los miembros de tu espacio"
          buttonText="Invitar a un amigo"
          controls={false}
        />
        <MembersSpaceList members={currentSpace.members} adminZone={false} />
      </section>
    </LayoutSpaces>
    </>
  );
}
