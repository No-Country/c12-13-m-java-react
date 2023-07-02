import { Main, Image } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@apollo/client";
import { GET_AFTER_LOGIN } from "@/graphql/queries";
import { useRouter } from "next/router";
import { SpaceProps, MembersProps } from "@/utils/types/client/spaces";
import { getCurrentSpace } from "@/redux/slices/client/spaces";

export default function Home() {
  const userId = 1234567890;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { spaces } = useAppSelector((state) => state.client.spaces);
  console.log("spaces", spaces);

  const handleClick = (spaceId: string) => {
   // dispatch(getCurrentSpace(spaceId));
    router.push(`/client/${userId}`);
  };

  const handleClickConfig = (spaceId: string) => {
    dispatch(getCurrentSpace(spaceId));
    router.push(`/client/${userId}/settings`);
  };

  return (
    <Main>
      <section className="h-screen bg-gray-100 px-[136px] py-[60px] ">
        <h1 className="text-2xl font-medium">Tus espacios</h1>
        <div className="mt-7 grid grid-cols-3 gap-4">
          {spaces.map((item: SpaceProps) => (
            <div
              key={item.id}
              className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              <button
                className="rounded-3xl bg-blue-500 px-4 py-2 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickConfig(item.id);
                }}
              >
                Configurar
              </button>
              <Image
                src={item.coverImage}
                alt="SpaceCover"
                layout="fill"
                width="w-[100%]"
                height="w-[100%]"
                aspectRatio="aspect-[4/3]"
                rounded="rounded-[20px]"
              />
              <div>
                <p>{item.name}</p>
                <div className="mt-2 flex gap-1">
                  {item.members.map((member: MembersProps) => (
                    <Image
                      key={member.id}
                      src={member.profileImage}
                      alt="MemberProfile"
                      layout="fill"
                      width="w-[30px]"
                      height="w-[30px]"
                      aspectRatio="aspect-[1/1]"
                      rounded="rounded-[20px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Main>
  );
}
