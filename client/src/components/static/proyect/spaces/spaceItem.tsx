import { Image, MembersList } from "@/components";
import { SpaceProps } from "@/utils/types/client/spaces";

type SpaceItemProps = {
  item: SpaceProps;
  handleClick: (spaceId: string) => void;
  handleClickConfig: (spaceId: string, config: boolean) => void;
};

export default function SpaceItem({
  item,
  handleClick,
  handleClickConfig,
}: SpaceItemProps) {
  return (
    <div
      key={item.id}
      className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4"
      onClick={() => {
        handleClick(item.id);
      }}
    >
      <button
        className="rounded-3xl bg-blue-500 px-4 py-2 text-white"
        onClick={(e) => {
          e.stopPropagation();
          handleClickConfig(item.id, true);
        }}
      >
        Configurar
      </button>
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
        <MembersList members={item.members} />
      </div>
    </div>
  );
}
