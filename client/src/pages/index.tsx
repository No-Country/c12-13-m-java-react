import { Main, Image, LayoutPublic } from "@/components";
import ImageNext from "next/image";
import Link from "next/link";
import Head from "next/head";

const items = [
  {
    title: "+50.000",
    body: "Clientes nos eligen en todo el mundo",
    image: "/icon/home/f1.svg",
  },
  {
    title: "Siéntete seguro",
    body: "Fuimos premiados 7 veces como plataforma mas segura",
    image: "/icon/home/f2.svg",
  },
  {
    title: "100% Garantizado",
    body: "Si no te gusta, te devolvemos tu dinero",
    image: "/icon/home/f3.svg",
  },
];

const employees = [
  {
    title: "Jaime Velasquez",
    body: "Project Manager",
    image: "/image/team/jaime.png",
  },
  {
    title: "Thomas Barenghi",
    body: "Desarrollador Fullstack",
    image: "/image/team/thomas.png",
  },
  {
    title: "José Rojas",
    body: "Desarrollador Frontend",
    image: "/image/team/jose.png",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>

      <LayoutPublic>
        <section className=" relative  flex h-[65vh]  w-full flex-col items-center  justify-center lg:h-[70vh] ">
          <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full ">
            <ImageNext
              src="/image/hero-home.png"
              alt="hero-home"
              fill
              className="z-[0] object-cover "
            />
          </div>
          <div className="seccion2-x z-[1] w-full">
            <div className=" ">
              <h1 className="titulo-1 text-white ">
                Organiza mejor, disfruta mas con aquellos que amas.
              </h1>
              <p className="bodyText  text-white">
                Con herramientas poderosas y fáciles de usar, podrás gestionar
                tus proyectos de manera eficiente, liberando tiempo para
                compartir momentos especiales con tu familia y amigos. Deja
                atrás el estrés y el desorden, y comienza a disfrutar plenamente
                de cada día.
              </p>
              <button className="primaryButton mt-4 ">
                <Link href={"/auth/register"}>Regístrate ahora, es gratis</Link>
              </button>
            </div>
          </div>
        </section>
        <section className="centerInner bg-white">
          <div className="seccion2-x centerInner gap-10 py-[80px]">
            <div>
              <p className="bodyText font-normal text-blue-700">
                Conozcámonos mejor
              </p>
              <h1 className="titulo-1">
                Simplificamos la vida de miles de personas al rededor del mundo
                🗺️🪐
              </h1>
              <p className="bodyText mt-1">
                Con nuestras herramientas intuitivas y funciones personalizadas,
                podrás planificar, colaborar y realizar un seguimiento de tus
                proyectos de manera más eficiente que nunca. Desde tareas
                individuales hasta grandes proyectos de equipo, nuestra
                aplicación te permite mantener todo en orden y alcanzar tus
                metas con facilidad.
              </p>
            </div>
            <div className=" flex flex-col items-start gap-10  lg:flex-row">
              {items.map((item, index) => {
                return <ItemFeature data={item} />;
              })}
            </div>
          </div>
        </section>
        <section className="centerInner relative   bg-slate-100 py-[80px] ">
          <div className="seccion2-x centerInner gap-10">
            <div className="centerInner">
              <p className="bodyText font-normal text-blue-700">
                Quienes somos
              </p>
              <h1 className="titulo-1 text-center">Conoce a nuestro equipo.</h1>
              <p className="bodyText mt-1 text-center">
              Nuestra misión es simplificar y mejorar tus procesos
              </p>
            </div>
            <div className="scrollbar-hide seccion1-x-padding  flex w-screen  gap-10 overflow-scroll lg:justify-center lg:gap-14 lg:overflow-visible">
              {employees.map((item, index) => (
                <Employees data={item} />
              ))}
            </div>
          </div>
        </section>
      </LayoutPublic>
    </>
  );
}

type EmployeesProps = {
  data: any;
};

function Employees({ data }: EmployeesProps) {
  return (
    <div className=" centerInner w-max  gap-4">
      <div className="relative aspect-square min-w-[250px]  gap-4 overflow-hidden rounded-full">
        <ImageNext
          src={data.image}
          alt="hero-home"
          layout="fill"
          objectFit="cover"
          className="aspect-square"
        />
      </div>
      <div className="centerInner">
        <h3 className="titulo-3">{data.title}</h3>
        <p className="bodyText">{data.body}</p>
      </div>
    </div>
  );
}

type ItemFeatureProps = {
  data: any;
};

function ItemFeature({ data }: ItemFeatureProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative min-h-[80px] min-w-[80px] ">
        <ImageNext
          src={data.image}
          alt="hero-home"
          layout="fill"
          objectFit="cover"
          className="aspect-square"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <h3 className="titulo-3">{data.title}</h3>
        <p className="bodyText">{data.body}</p>
      </div>
    </div>
  );
}
