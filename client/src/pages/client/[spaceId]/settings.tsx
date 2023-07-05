import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>

        <section className="">
          <h1 className="text-2xl font-medium">Configuracion del espacio</h1>
          <h2 className="mt-5 text-xl font-medium">Info del espacio</h2>
          <SpaceInfoCard space={currentSpace} adminZone={true} />
          <h2 className="mt-5 text-xl font-medium">Miembros</h2>
          <MembersSpaceList members={currentSpace.members} adminZone={true} />
        </section>

    </LayoutSpaces>
  );
}
