import {
  Main,
  SpacesList,
  SpaceCreateForm,
  Image,
  Hr,
  Header,
  ListTopArea,
  Loader,
} from "@/components";
import Head from "next/head";
import NextImage from "next/image";
export default function HomeClient() {
  return (
    <>
      <Head>
        <title>Mis espacios | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <Main>
        <Header />
        <Hero />
        <SpacesList />
      </Main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative mt-0 flex h-[65vh]  w-full items-center justify-center  pt-[55px]  lg:mt-[-97px] ">
      <NextImage
        src="/image/hero-client.png"
        alt="SpaceCover"
        layout="fill"
        className="left-0 right-0 top-0  h-full w-full object-cover object-center"
      />

      <div className="seccion1-x  relative flex w-full flex-grow items-center justify-between gap-10  pb-[30px] ">
        <div className="  flex h-full flex-col items-center justify-start gap-6  lg:flex-row">
          {/* <Image
            src="/icon/illustrationHome.svg"
            alt="IllustrationHome"
            width="w-[99px]"
            height="h-[120px]"
            layout="fill"
            aspectRatio="aspect-[99/120] "
            containerClassName="hidden lg:flex"
          /> */}
          <div className=" flex h-full flex-col ">
            <div>
              <h1 className="titulo-1 text-white">
                Todas las empresas empiezan desde un espacio
              </h1>
              <p className="bodyText text-white lg:max-w-[85%] ">
                Aprovecha todas las ventajas de nuestra suscripción Premium y
                lleva tu negocio al siguiente nivel. Únete ahora y empieza a
                marcar la diferencia desde tu propio espacio.
              </p>
            </div>
            <button className="primaryButton mt-4 w-max whitespace-nowrap">
              Accede sin limites con premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <div className="mt-[-60px]  w-full ">
      <SpacesList />
    </div>
  );
}
