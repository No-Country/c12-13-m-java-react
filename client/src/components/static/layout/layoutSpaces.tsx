import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Main, Image, Sidebar } from "@/components";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutSpaces: React.FC<Props> = ({ children }) => {
  const { session } = useAppSelector((state) => state.authSession);

  return (
    <div className="grid grid-cols-[20%,80%]">
      <Sidebar />
      {children}
    </div>
  );
};

export default LayoutSpaces;
