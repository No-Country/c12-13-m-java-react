import { Main, Image, LayoutSpaces } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@apollo/client";
import { GET_AFTER_LOGIN } from "@/graphql/queries";
import { useRouter } from "next/router";
import { SpaceProps, MembersProps } from "@/utils/types/client/spaces";

export default function Home() {
  const userId = 1234567890;
  const router = useRouter();
  const { spaces, currentSpace } = useAppSelector(
    (state) => state.client.spaces
  );

  console.log("spaces", spaces);

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
              <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
                Editar
              </button>
              <button className="rounded-3xl bg-red-800 px-4 py-2 text-white">
                Eliminar
              </button>
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
                  <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
                    Editar
                  </button>
                  <button className="rounded-3xl bg-red-800 px-4 py-2 text-white">
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
        </section>
      </Main>
    </LayoutSpaces>
  );
}
