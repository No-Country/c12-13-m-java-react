import { Main, SpacesList, ModalTrigger, Image, Hr } from "@/components";

export default function HomeClient() {
  return (
    <Main className="gap-[40px] ">
      <Hero />
      <Hr />
      <Spaces />
    </Main>
  );
}

function Hero() {
  return (
    <section className="pt-[55px] ">
      <div className="seccion1-x  relative flex w-full items-center justify-between gap-10">
        <div className="  flex items-center justify-start gap-6">
          <Image
            src="/icon/illustrationHome.svg"
            alt="IllustrationHome"
            width="w-[99px]"
            height="h-[120px]"
            layout="fill"
          />
          <div className=" flex flex-col ">
            <h1 className="titulo-1">
              Todas las empresas empiezan desde un espacio
            </h1>
            <p className="bodyText max-w-[85%] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              ultrices nulla sed luctus volutpat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.{" "}
            </p>
          </div>
        </div>
        <button className="primaryButton whitespace-nowrap">
          Accede sin limites con premium
        </button>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <section className="seccion1-x flex gap-6 flex-col pb-12">
      <div className="relative flex w-full items-center justify-between gap-10">
        <div className="flex flex-col items-start justify-center ">
          <h2 className="titulo-3">Mis espacios</h2>
          <p className="bodyText ">Organiza tus proyectos</p>
        </div>
        <ModalTrigger triggerText="Crear nuevo espacio">
          <div>Form crear un espacio</div>
        </ModalTrigger>
      </div>
      <SpacesList />
    </section>
  );
}
