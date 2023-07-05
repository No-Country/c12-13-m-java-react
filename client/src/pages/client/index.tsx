import {
  Main,
  SpacesList,
  ModalTrigger,
  Image,
  Hr,
  ListTopArea,
} from "@/components";

export default function HomeClient() {
  return (
    <Main className="gap-[40px] ">
      <Hero />
      <Hr hasPadding={true} />
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
            aspectRatio="aspect-[99/120] "
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
    <section className="seccion1-x flex flex-col gap-6 pb-12">
      <ListTopArea
        title="Mis espacios"
        description="Organiza tus proyectos"
        buttonText="Crear nuevo espacio"
        triggerContent={<div>Form crear un espacio</div>}
      />
      <SpacesList />
    </section>
  );
}
