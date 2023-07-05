import { Main, HelpHero } from "@/components";
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terminos y condiciones | Spaces</title>
      </Head>
      <Main>
        <HelpHero
          title="Terminos de Spaces"
          body="Los siguientes términos y condiciones establecen el acuerdo legal entre BeatConnect y los usuarios del sitio web. Al acceder y utilizar el sitio web, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos condiciones, por favor no utilice este sitio web."
          image="/image/hero-home.png"
          height="h-[45vh]"
        />
      </Main>
    </>
  );
}