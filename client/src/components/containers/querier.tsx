import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { getCurrentSpace, getCurrentRoom, getRooms } from "@/redux/slices/client/spaces";

type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { spaceId, roomId } = router.query;

  useEffect(() => {
    if (
      spaceId &&
      (router.pathname === "/client/[spaceId]" ||
        router.pathname === "/client/[spaceId]/settings" || router.pathname === "/client/[spaceId]/members" || router.pathname === "/client/[spaceId]/files")
    ) {
      dispatch(getCurrentSpace(spaceId as string));
      dispatch(getRooms(spaceId as string));
    }
  }, [spaceId, router.pathname]);

  useEffect(() => {
    if (spaceId && roomId && router.pathname === "/client/[spaceId]/[roomId]") {
      dispatch(getCurrentSpace(spaceId as string));
      dispatch(getCurrentRoom(roomId as string));
    }
  }, [spaceId, roomId, router.pathname]);

  return <div>{children}</div>;
}
