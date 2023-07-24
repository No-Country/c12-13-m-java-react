import { LayoutSpaces } from "@/components";
import Head from "next/head";

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>Mi cuenta - Sesiones | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="account">x</LayoutSpaces>
    </>
  );
}
