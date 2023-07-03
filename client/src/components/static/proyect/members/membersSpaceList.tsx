import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
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
    <div className="mt-2 flex flex-col gap-4">
      {Array.isArray(members) &&
        members.map((member: MembersProps) => (
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-white p-5">
            <div className="flex w-full items-center justify-start gap-2">
              <Image
                src={member.profileImage}
                alt="avatar"
                width="w-[40px]"
                height="w-[40px]"
                rounded="rounded-full"
                aspectRatio="aspect-[1/1]"
                layout="fill"
              />
              <p className="text-center">
                {member.firstName + " " + member.lastName}
              </p>
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
