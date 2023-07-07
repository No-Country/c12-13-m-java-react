import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
  FilesList,
  HeroSpaceArea,
  Hr,
  ListTopArea,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";
import Head from "next/head";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
<>
    <Head>
    <title>Archivos del espacio | Spaces</title>
  </Head>
    <LayoutSpaces type="client" >
      <HeroSpaceArea
        current={currentSpace}
        type="room"
        controls={true}
        triggerText="Subir un archivo"
      >
        <div>Form Subir un archivo</div>
      </HeroSpaceArea>
      <Hr hasPadding={false} />
      <section className=" flex flex-col gap-6">
        <ListTopArea
          title="Archivos"
          description="Administra los archivos de tu espacio"
          buttonText="Invitar a un amigo"
          controls={false}
        />
        <FilesList files={currentSpace.files} />
      </section>
    </LayoutSpaces>
    </>
  );
}
