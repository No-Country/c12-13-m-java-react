import { RoomsProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import { RoomItem } from "@/components";
import { useRouter } from "next/router";

export default function RoomsList() {
  const router = useRouter();
  const { spaceId } = router.query;
  const { rooms } = useAppSelector((state) => state.client.spaces.rooms);

  return (
    <div className=" grid grid-cols-3 gap-4">
      {Array.isArray(rooms) &&
        rooms.map((item: RoomsProps) => (
          <RoomItem
            item={item}
            handleClick={(roomId: string) => {
              router.push(`/client/${spaceId}/${roomId}`);
            }}
          />
        ))}
    </div>
  );
}
