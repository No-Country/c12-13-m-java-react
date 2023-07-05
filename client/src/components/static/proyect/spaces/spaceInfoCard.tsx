import { useAppSelector } from "@/redux/hooks";
import { MembersProps, SpaceProps } from "@/utils/types/client/spaces";
import { ConfirmationModal, ModalTrigger } from "@/components";

type SpaceInfoCardProps = {
  space: SpaceProps;
  adminZone: boolean;
};

export default function SpaceInfoCard({
  space,
  adminZone,
}: SpaceInfoCardProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-white p-5">
      <p className="text-center">
        {space.name} | {space.description}
      </p>
      {adminZone && (
        <div>
          <ModalTrigger triggerText="Editar">
            <div>Form editar espacio</div>
          </ModalTrigger>
          <ConfirmationModal
            triggerText="Eliminar"
            confirmText="Eliminar espacio"
            confirmParagraph="¿Estas seguro que quieres eliminar este espacio? Esta accion no se puede deshacer."
            trueAction={() => console.log("eliminar espacio")}
            triggerColor="bg-red-800"
          />
        </div>
      )}
    </div>
  );
}
