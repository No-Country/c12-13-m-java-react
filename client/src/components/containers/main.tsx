import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Main: React.FC<Props> = ({ children, className }) => {
  return <main>{children}</main>;
};

export default Main;
