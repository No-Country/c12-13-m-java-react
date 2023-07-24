import ImageNext from "next/image";

type HelpHeroProps = {
  title: string;
  body: string;
  image: string;
  height?: string;
};

export default function HelpHero({
  title,
  body,
  image,
  height,
}: HelpHeroProps) {
  return (
    <section
      className={`relative  ${height} w-full flex justify-center items-center min-h-[250px] `}
    >
      <div className="seccion2-x justify-start items-center  z-[2] flex w-full min-h-[250px] " >
      <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full">
        <ImageNext
          src={image}
          alt="hero-help"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-[100%] z-[1] md:w-[60%]">
      <h1 className="titulo-1 z-[1] text-white ">{title}</h1>
      <p className="bodyText z-[1] text-white">{body}</p>
      </div> 
      </div>
    </section>
  );
}
