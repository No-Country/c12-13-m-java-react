import { Main, HelpHero } from "@/components";
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacidad | Spaces</title>
      </Head>
      <Main>
        <HelpHero
          title="Politica de privacidad"
          body="En nuestra plataforma, nos tomamos muy en serio la privacidad de
        nuestros usuarios y nos comprometemos a proteger la información
        personal que compartes con nosotros. Nuestra política de privacidad
        detalla cómo recopilamos, utilizamos, divulgamos y protegemos tu
        información personal, así como tus derechos y opciones en cuanto a su
        uso."
          image="/image/hero-home.png"
          height="h-[45vh]"
        />
      </Main>
    </>
  );
}
