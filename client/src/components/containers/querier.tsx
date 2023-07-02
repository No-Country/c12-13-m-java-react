import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { AuthProps, SessionProps } from "@/utils/types/client/authSession";
import { setAuth, setSession } from "@/redux/slices/authSession";

type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  return <div>{children}</div>;
}
