import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps, GeneralPermission } from "@/utils/types/client/spaces";
import { debounce } from "lodash";
import { getCurrentSpace } from "@/redux/slices/client/spaces/spaces";
import { getCurrentRoom, getRooms } from "@/redux/slices/client/spaces/rooms";

type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { spaceId, roomId } = router.query;
  const { currentSpace, currentMember, spaceLoading } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

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
  }, [spaceId, router.pathname, spaceLoading === false]);

  useEffect(() => {
    if (
      spaceId &&
      roomId &&
      router?.pathname === "/client/[spaceId]/[roomId]"
    ) {
      dispatch(getCurrentSpace(spaceId as string));
      dispatch(getCurrentRoom(roomId as string));
    }
  }, [spaceId, roomId, router.pathname, spaceLoading === false]);

  //Check if user is admin of current space

  const handleAdmin = () => {
    if (
      router.pathname === "/client/[spaceId]/settings" &&
      currentMember instanceof MembersProps
    ) {
      if (!currentMember?.hasPermission(GeneralPermission?.EditSpace)) {
        router.push(`/client/${currentSpace.id}`);
      }
    }
  };

  const delayedSystemStart = useMemo(
    () => debounce(() => handleAdmin(), 1500),
    [router.pathname]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedSystemStart.cancel();
    };
    delayedSystemStart();
    return cancelDebounce;
  }, [delayedSystemStart]);

  return <div>{children}</div>;
}
