import { LayoutSpaces } from "@/components";
import Head from "next/head";

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>Mi cuenta | Spaces</title>
      </Head>
      <LayoutSpaces type="account">x</LayoutSpaces>
    </>
  );
}