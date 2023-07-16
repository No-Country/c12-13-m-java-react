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
import { useRouter } from "next/router";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces.spaces);
const router = useRouter()
console.log(router)
  return (
<>
    <Head>
    <title>Archivos del espacio | Spaces</title>
    <meta name="theme-color" content="#1e40af" />
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
        <FilesList files={currentSpace.files} />
    </LayoutSpaces>
    </>
  );
}
