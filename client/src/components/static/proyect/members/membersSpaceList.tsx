import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MemberPicture,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";

type MembersListProps = {
  members: MembersProps[];
  adminZone: boolean;
};

export default function MembersSpaceList({
  members,
  adminZone,
}: MembersListProps) {
  return (
    <div className="  gap-5 grid grid-cols-3">
      {Array.isArray(members) &&
        members.map((member: MembersProps) => (
          <div className="flex w-full items-center justify-between gap-3 rounded-3xl bg-white p-5">
            <div className="flex w-full items-center justify-start gap-3">
              <MemberPicture member={member} size="large" hasMargin={false} />
              <div className="flex flex-col ">
              <p className="subtitulo">
                {member.firstName + " " + member.lastName}
              </p>
              <p className="smalltext">
                {member.role === "admin" ? "Administrador" : "Miembro"}
              </p>
            </div>
            </div>
            <div>
              {adminZone && (
                <div>
                  <ModalTrigger triggerText="Editar">
                    <div>Form editar miembro</div>
                  </ModalTrigger>
                  <ConfirmationModal
                    triggerText="Eliminar"
                    confirmText="Eliminar miembro"
                    confirmParagraph="Estas seguro que quieres eliminar a este miembro?"
                    triggerColor="bg-red-800"
                    trueAction={() => console.log("Se elimina el miembro")}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}