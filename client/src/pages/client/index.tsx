import { Main, SpacesList } from "@/components";

export default function HomeClient() {
  return (
    <Main>
      <section className="h-screen bg-gray-100 px-[136px] py-[60px] ">
        <h1 className="text-2xl font-medium">Tus espacios</h1>
        <SpacesList />
      </section>
    </Main>
  );
}
