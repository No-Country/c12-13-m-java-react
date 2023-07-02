
import { Main, Image, LayoutSpaces } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@apollo/client";
import { GET_AFTER_LOGIN } from "@/graphql/queries";
import { useRouter } from "next/router";
import { SpaceProps, MembersProps } from "@/utils/types/client/spaces";

export default function Home() {
  const userId = 1234567890;
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state.client.spaces);

  console.log("spaces",spaces);

  return (
    <LayoutSpaces>
    <Main>
      <section className="h-screen bg-gray-100 px-[136px] py-[60px] ">
        <h1 className="text-2xl font-medium">Configuracion del espacio</h1>
       

      </section>
    </Main>
    </LayoutSpaces>
  );
}
