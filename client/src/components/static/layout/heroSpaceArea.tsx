import {
  Main,
  LayoutSpaces,
  TasksList,
  ModalTrigger,
  Image,
  MembersList,
} from "@/components";
import {
  MembersProps,
  RoomsProps,
  SpaceProps,
} from "@/utils/types/client/spaces";

type HeroSpaceAreaProps = {
  current: SpaceProps | RoomsProps;
  type: "space" | "room";
  controls?: boolean;
  triggerText: string;
  children?: JSX.Element;
};

export default function HeroSpaceArea({
  current,
  type,
  children,
  triggerText,
  controls = true,
}: HeroSpaceAreaProps) {
  {
    return (
      <section className="flex flex-col gap-10  ">
        <div className="flex items-center  gap-4 ">
          <div className="flex w-full  items-center gap-4">
            <Image
              src={current?.coverImage}
              alt="SpaceCover"
              layout="fill"
              width="w-[90px]"
              height="w-[90px]"
              aspectRatio="aspect-[1/1]"
              rounded="rounded-[20px]"
              containerClassName="min-w-[90px] min-h-[90px] "
            />
            <div className="">
              <h1 className="titulo-1 ">{current?.name}</h1>
              <p className="bodyText">{current?.description}</p>
            </div>
          </div>
          {controls && (
            <div className="flex w-full flex-row items-center justify-end gap-5">
              {type === "space" && (
                <MembersList members={current?.members} size="medium" pictureHasMargin={true} />
              )}

              <ModalTrigger
                triggerText={triggerText}
                buttonType="primaryButton"
              >
                {children}
              </ModalTrigger>
            </div>
          )}
        </div>
      </section>
    );
  }
}
