import { Main, HelpHero } from "@/components";

export default function Home() {
  return (
    <Main>
      <HelpHero
        title="Centro de ayuda"
        body="En nuestro centro de ayuda, nos esforzamos por proporcionar una experiencia de usuario excepcional a todos nuestros clientes. Estamos aquí para responder cualquier pregunta que puedas tener y ayudarte a solucionar cualquier problema que puedas encontrar al utilizar nuestra plataforma."
        image="/image/hero-home.png"
        height="h-[45vh]"
      />
    </Main>
  );
}
