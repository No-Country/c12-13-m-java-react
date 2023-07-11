import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { debounce } from "lodash";
import {
  getCurrentSpace,
  setIsAdminOfCurrentSpace,
} from "@/redux/slices/client/spaces/spaces";
import { getCurrentRoom, getRooms } from "@/redux/slices/client/spaces/rooms";
type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { spaceId, roomId } = router.query;
  const { id } = useAppSelector((state) => state.authSession.session.current);
  const { currentSpace, userIsAdminOfCurrentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const [isAdmin, setIsAdmin] = useState<any>();
  useEffect(() => {
    if (
      spaceId &&
      (router.pathname === "/client/[spaceId]" ||
        router.pathname === "/client/[spaceId]/settings" ||
        router.pathname === "/client/[spaceId]/members" ||
        router.pathname === "/client/[spaceId]/files")
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

  //Check if user is admin of current space

  const handleAdmin = () => {
    if (router.pathname === "/client/[spaceId]/settings") {
      if (!userIsAdminOfCurrentSpace) {
        router.push(`/client/${currentSpace.id}`);
      }
    }
  };

  const delayedSystemStart = useMemo(
    () => debounce(() => handleAdmin(), 1500),
    [router.pathname, userIsAdminOfCurrentSpace]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedSystemStart.cancel();
    };
    delayedSystemStart();
    return cancelDebounce;
  }, [delayedSystemStart]);

  useEffect(() => {
    setIsAdmin(
      Boolean(
        currentSpace?.members?.find(
          (member: any) => member?.user?.id === id && member?.role === "admin"
        )
      )
    );
    dispatch(setIsAdminOfCurrentSpace(isAdmin));
  }, [currentSpace]);

  return <div>{children}</div>;
}
