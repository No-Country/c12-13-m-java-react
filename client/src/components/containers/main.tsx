import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Main: React.FC<Props> = ({ children, className }) => {
  return <main className="max-w-[100vw] min-h-screen flex w-full min-w-screen items-center flex-col bg-slate-50 " >{children}</main>;
};

export default Main;
