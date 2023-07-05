import { useAppSelector } from "@/redux/hooks";
import { SpaceProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  RoomsList,
  ModalTrigger,
  ListTopArea,
  HeroSpaceArea,
  Hr,
} from "@/components";

export default function Space() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>
      <HeroSpaceArea
        current={currentSpace}
        type="space"
        triggerText="Invitar a un amigo"
      >
        <div>Form Invitar un mieembro</div>
      </HeroSpaceArea>
      <Hr />
      <section className=" flex flex-col gap-10 ">
        <div className=" flex flex-col gap-6">
          <ListTopArea
            title="Mis rooms"
            description="Organiza tu espacio en pequeñas salas"
            buttonText="Crear nuevo room"
            triggerContent={<div>Form crear un room</div>}
          />
          <RoomsList />
        </div>
      </section>
    </LayoutSpaces>
  );
}
