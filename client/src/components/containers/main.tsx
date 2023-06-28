import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default Main;
