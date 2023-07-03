import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
  FilesList,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>
      <Main>
        <section className="h-screen bg-gray-100 px-[60px] py-[60px] ">
          <h1 className="text-2xl font-medium">Archivos del espacio</h1>
          <SpaceInfoCard space={currentSpace} adminZone={false} />
          <h2 className="mt-5 text-xl font-medium">Archivos</h2>
          <ModalTrigger
        triggerText="Subir un archivo"
        >
          <div>Form Subir un archivo</div>
        </ModalTrigger>
          <FilesList files={currentSpace.files} />
        </section>
      </Main>
    </LayoutSpaces>
  );
}
