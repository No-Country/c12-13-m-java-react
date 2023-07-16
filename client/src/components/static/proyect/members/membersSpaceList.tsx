import {
  ConfirmationModal,
  ModalTrigger,
  MemberPicture,
  ListTopArea,
  Popover,
} from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";
import { expulseMember } from "@/redux/slices/client/spaces/spaces";
import { ReactSVG } from "react-svg";

type MembersListProps = {
  members: MembersProps[];
  adminZone: boolean;
};

export default function MembersSpaceList({
  members,
  adminZone,
}: MembersListProps) {
  const dispatch = useAppDispatch();

  const childrenTrigger = (
    <ReactSVG src="/icon/sidebar/config.svg" className="h-5 w-5" />
  );

  return (
    <section className="listContainer">
      <ListTopArea
        title="Miembros"
        description="Miembros del espacio"
        buttonText="Invitar a un amigo"
        controls={false}
      />
      <div className=" gridContainer">
        {Array.isArray(members) &&
          members.map((member: MembersProps) => (
            <div className="flex w-full items-center justify-between gap-3 rounded-3xl border-[0.5px]  border-none bg-white py-5 pl-5 pr-8 shadow-sm lg:border-slate-200 lg:bg-white">
              <div className="flex items-center gap-3">
                <MemberPicture
                  member={member.user}
                  size="large"
                  hasMargin={false}
                />
                <div className="flex flex-col">
                  <p className="subtitulo">
                    {member.user.firstName + " " + member.user.lastName}
                  </p>
                  <p className="smalltext">
                    {member.role === "admin" ? "Administrador" : "Miembro"}
                  </p>
                </div>
              </div>
              <div>
                {adminZone && (
                  <div>
                    <Popover childrenTrigger={childrenTrigger}>
                      <ModalTrigger triggerText="Editar">
                        <div>Form editar miembro</div>
                      </ModalTrigger>
                      <ConfirmationModal
                        triggerText="Eliminar"
                        confirmText="Eliminar miembro"
                        confirmParagraph="Estas seguro que quieres eliminar a este miembro?"
                        triggerColor="bg-red-800 primaryButton"
                        trueAction={() =>
                          dispatch(expulseMember({ userId: member.user.id }))
                        }
                      />
                    </Popover>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
