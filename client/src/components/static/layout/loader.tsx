import style from "@/styles/loader.module.scss"
import Image from "next/image";

export default function Loader() {
  return (
    <>
    <Image
        src="/icon/loader.svg"
        alt="Loader"
        width={45}
        height={45}
     />

    </>
  );
}
