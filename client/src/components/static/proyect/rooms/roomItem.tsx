import { Image } from "@/components";
import { RoomsProps } from "@/utils/types/client/spaces";

type RoomItemProps = {
  item: RoomsProps;
  handleClick: (roomId: string) => void;
};

export default function RoomItem({ item, handleClick }: RoomItemProps) {
  return (
    <div
      key={item.id}
      className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4"
      onClick={() => handleClick(item.id)}
    >
      <Image
        src={item.coverImage}
        alt="SpaceCover"
        layout="fill"
        width="w-[100%]"
        height="w-[100%]"
        aspectRatio="aspect-[4/3]"
        rounded="rounded-[20px]"
      />
      <div>
        <p>{item.name}</p>
      </div>
    </div>
  );
}
