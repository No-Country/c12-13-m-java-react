import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>
      <Main>
        <section className="h-screen bg-gray-100 px-[60px] py-[60px] ">
          <h1 className="text-2xl font-medium">Configuracion del espacio</h1>
          <h2 className="mt-5 text-xl font-medium">Info del espacio</h2>
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-white p-5">
            <p className="text-center">
              {currentSpace.name} | {currentSpace.description}
            </p>
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
          </div>
          <h2 className="mt-5 text-xl font-medium">Miembros</h2>
          <div className="mt-2 flex flex-col gap-4">
            {Array.isArray(currentSpace.members) &&
              currentSpace?.members.map((member: MembersProps) => (
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
                </div>
              ))}
          </div>
        </section>
      </Main>
    </LayoutSpaces>
  );
}
