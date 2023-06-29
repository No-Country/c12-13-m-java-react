import { Main } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <Main>
      <section className="flex flex-col">
      <h1>Home</h1>
      <h2 className="text-2xl text-red-700">Hola, bienvenido a nuestro deploy</h2>
  <div  className="flex flex-col">
    <h3 className="text-2xl text-red-700 mt-6">Links</h3>
    <Link href="/">
      Home
    </Link>
    <Link href="/about">
      About
    </Link>
    <Link href="/help">
      Help
    </Link>
  </div>
  </section>
    </Main>
  );
}
