import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard
} from "@/components";

export default function Members() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  return (
    <LayoutSpaces>
      <Main>
        <section className="h-screen bg-gray-100 px-[60px] py-[60px] ">
          <h1 className="text-2xl font-medium">Miembros del espacio</h1>
          <h2 className="mt-5 text-xl font-medium">Info del espacio</h2>
          <SpaceInfoCard space={currentSpace} adminZone={false} />
          <h2 className="mt-5 text-xl font-medium">Miembros</h2>
          <MembersSpaceList members={currentSpace.members} adminZone={false} />
        </section>
      </Main>
    </LayoutSpaces>
  );
}
