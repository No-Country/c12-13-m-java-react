import { RoomsProps, GeneralPermission } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import { RoomItem, ListTopArea, RoomCreateForm } from "@/components";
import { useRouter } from "next/router";

export default function RoomsList() {
  const router = useRouter();
  const { spaceId } = router.query;
  const { rooms } = useAppSelector((state) => state.client.spaces.rooms);

  return (
    
    <div className=" listContainer">
      <ListTopArea
        title="Mis rooms"
        triggerIsAdmin={true}
        description="Organiza tu espacio en pequeñas salas"
        buttonText="Crear nuevo room"
        triggerContent={<RoomCreateForm />}
      />
      <div className="gridContainer">
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

    </div>
  );
}
