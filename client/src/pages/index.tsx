import { Main, Image } from "@/components";
import ImageNext from "next/image";
import Link from "next/link";

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
    title: "Juan Perez",
    body: "CEO",
    image: "/image/hero-home.png",
  },
  {
    title: "Juan Perez",
    body: "CEO",
    image: "/image/hero-home.png",
  },
  {
    title: "Juan Perez",
    body: "CEO",
    image: "/image/hero-home.png",
  },
  {
    title: "Juan Perez",
    body: "CEO",
    image: "/image/hero-home.png",
  },
];

export default function Home() {
  return (
    <Main>
      <section className="relative flex h-[55vh] w-full flex-col items-start  justify-center px-[136px]">
        <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full">
          <ImageNext
            src="/image/hero-home.png"
            alt="hero-home"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="titulo-1 z-[1] text-white ">
          Organiza mejor, disfruta mas con aquellos que amas.
        </h1>
        <p className="bodyText z-[1] text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices
          nulla sed luctus volutpat.
        </p>
        <button className="primaryButton z-[1] mt-4 ">
          <Link href={"/auth/register"}>Regístrate ahora, es gratis</Link>
        </button>
      </section>
      <section className="relative flex w-full flex-col gap-8 bg-white px-[136px] py-[80px] ">
        <div>
          <p className="bodyText font-normal text-blue-700">
            Conozcámonos mejor
          </p>
          <h1 className="titulo-1">
            Simplificamos la vida de miles de personas al rededor del mundo 🗺️🪐
          </h1>
          <p className="bodyText mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
            dapibus nisi, sit amet aliquam massa. Nunc eu feugiat massa. Nunc
            magna risus, tempor sed sem quis, eleifend pulvinar eros.
          </p>
        </div>
        <div className=" flex flex-row justify-between gap-10">
          {items.map((item, index) => {
            return <ItemFeature data={item} />;
          })}
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center justify-center gap-10   px-[136px] py-[80px] ">
        <div className="flex flex-col items-center justify-center">
          <p className="bodyText font-normal text-blue-700">Quienes somos</p>
          <h1 className="titulo-1">Conoce a nuestro equipo.</h1>
          <p className="bodyText mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex items-start justify-center gap-10">
          {employees.map((item, index) => (
            <Employees data={item} />
          ))}
        </div>
      </section>
    </Main>
  );
}

type EmployeesProps = {
  data: any;
};

function Employees({ data }: EmployeesProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative aspect-square w-[100%] min-w-[200px]  gap-4 overflow-hidden rounded-full">
        <ImageNext
          src={data.image}
          alt="hero-home"
          layout="fill"
          objectFit="cover"
          className="aspect-square"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
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
