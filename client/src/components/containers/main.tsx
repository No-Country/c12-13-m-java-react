import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Main: React.FC<Props> = ({ children, className }) => {
  return <main className="min-h-screen bg-slate-50" >{children}</main>;
};

export default Main;
