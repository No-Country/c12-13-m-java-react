import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HOC: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default HOC;
