import { Main } from "@/components";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GET_COUNTRIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const [dataAJAX, setData] = useState<any>(null);
  const { loading, error, data } = useQuery(GET_COUNTRIES);
//hola
  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data);

  return (
    <Main>
      <section className="flex flex-col">
        <h1>Home</h1>
        <h2 className="text-2xl text-red-700">
          Hola, bienvenido a nuestro deploy
        </h2>
        <div className="flex flex-col">
          <h3 className="mt-6 text-2xl text-red-700">Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/help">Help</Link>
          <h1 className="mt-6 text-2xl text-red-700">Test REST</h1>
          <div className="grid grid-cols-3">
            {dataAJAX?.results.map((item: any) => (
              <div key={item.id}>
                <Image src={item.image} alt="Rick" width={200} height={200} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <h1 className="mt-6 text-2xl text-red-700">Test GraphQL</h1>
          <div className="grid grid-cols-3">
            {data?.countries.map((item: any) => (
              <div key={item.code}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Main>
  );
}
