import { Image, MembersList } from "@/components";
import { SpaceProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { UserProps } from "@/utils/types/client";

type SpaceItemProps = {
  item: SpaceProps;
  handleClick: (spaceId: string) => void;
  handleClickConfig: (spaceId: string, config: boolean) => void;
};

export default function SpaceItem({ item, handleClick }: SpaceItemProps) {

  const {current: cUser} = useAppSelector((state) => state.authSession.session);

  item = SpaceProps.deserialize(item);
  const currentUser = UserProps.deserialize(cUser);

  return (
    <div
      key={item?.id}
      className="flex relative  h-max cursor-pointer flex-col overflow-hidden rounded-2xl  bg-white shadow-sm "
      onClick={() => {
        handleClick(item?.id);
      }}
    >
      {
        item.isFromUser(currentUser) && (
          <div className="absolute top-0 right-0 z-10">
          <p className="smalltext font-medium  bg-blue-700 text-white rounded-2xl border-blue-200 rounded-br-none rounded-tl-none px-4 py-2">
            Propio
          </p>
        </div>
        )
      }
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
