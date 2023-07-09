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
      key={item?.id}
      className="flex  cursor-pointer flex-col h-max overflow-hidden rounded-2xl  bg-white"
      onClick={() => {
        handleClick(item?.id);
      }}
    >
      <Image
        src={item?.coverImage}
        alt="SpaceCover"
        layout="fill"
        width="w-[100%]"
        height="w-[100%]"
        aspectRatio="aspect-[59/32]"
      />
      <div className="flex flex-col items-start justify-start gap-3 p-5 ">
        <div>
          <p className="subtitulo">{item?.name}</p>
          <p className="smalltext">{item?.description}</p>
        </div>
        <MembersList members={item?.members} size="small" pictureHasMargin={true} />
      </div>
    </div>
  );
}

{
  /* <button
className="rounded-3xl bg-blue-500 px-4 py-2 text-white"
onClick={(e) => {
  e.stopPropagation();
  handleClickConfig(item.id, true);
}}
>
Configurar
</button> */
}
