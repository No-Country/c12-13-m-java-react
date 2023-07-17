import { Header, Main, Footer } from "@/components";

type Props = {
  children: React.ReactNode;
};

export default function LayoutPublic({ children }: Props) {
  return (
    <>
      <Main>
        <Header />
        <div className="layoutPubContainer">
          <div className="layoutPubChildren">{children}</div>
        </div>
        <Footer />
      </Main>
    </>
  );
}
