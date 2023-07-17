import { LayoutSpaces, FilesList, HeroSpaceArea } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import Head from "next/head";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  return (
    <>
      <Head>
        <title>Archivos del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="room"
          controls={true}
          triggerText="Subir un archivo"
        >
          <div>Form Subir un archivo</div>
        </HeroSpaceArea>
        <FilesList files={currentSpace.files} />
      </LayoutSpaces>
    </>
  );
}
