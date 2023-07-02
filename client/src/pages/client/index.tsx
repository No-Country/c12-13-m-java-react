import { Main, Image } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@apollo/client";
import { GET_AFTER_LOGIN } from "@/graphql/queries";
import { useRouter } from "next/router";

type SpaceProps = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
};

export default function Home() {
  const userId = 1234567890;
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state.client.spaces);

  console.log("spaces",spaces);

  return (
    <Main>
      <section className="h-screen bg-gray-100 px-[136px] py-[60px] ">
        <h1 className="text-2xl font-medium">Tus espacios</h1>
        <div className="mt-7 grid grid-cols-3 gap-4">
          {spaces.map((item: SpaceProps) => (
            <div
              key={item.id}
              className="cursor-pointer flex flex-col gap-2 rounded-3xl bg-white p-4 h-auto"
              onClick={() => {router.push(`/client/${item.id}`)}}
            >
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
              </div>
              
            </div>
          ))}
        </div>
      </section>
    </Main>
  );
}
