import { Image, MembersList } from "@/components";
import { SpaceProps } from "@/utils/types/client";

type SpaceItemProps = {
  item: SpaceProps;
  handleClick: (spaceId: string) => void;
  handleClickConfig: (spaceId: string, config: boolean) => void;
};

export default function SpaceItem({ item, handleClick }: SpaceItemProps) {

  item = SpaceProps.deserialize(item);

  return (
    <div
      key={item?.id}
      className="flex  h-max cursor-pointer flex-col overflow-hidden rounded-2xl border-[0.5px] border-none bg-white shadow-sm lg:border-slate-200"
      onClick={() => {
        handleClick(item?.id);
      }}
    >
      <Image
        src={item?.getCoverImage()}
        alt="SpaceCover"
        layout="fill"
        width="w-[100%]"
        height="w-[100%]"
        aspectRatio="aspect-[59/32]"
      />
      <div className="flex flex-col items-start justify-start gap-3 p-5 ">
        <div>
          <p className="subtitulo">{item?.getName()}</p>
          <p className="smalltext">{item?.getDescription()}</p>
        </div>
        <MembersList
          members={item?.getMembers()}
          size="small"
          pictureHasMargin={true}
        />
      </div>
    </div>
  );
}
