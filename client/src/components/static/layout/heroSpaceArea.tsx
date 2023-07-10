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
import { useAppSelector } from "@/redux/hooks";

type HeroSpaceAreaProps = {
  current: SpaceProps | RoomsProps;
  type: "space" | "room";
  controls?: boolean;
  triggerText: string;
  children?: JSX.Element;
  secondControls?: boolean;
  childrenSecond?: JSX.Element;
  triggerSecondText?: string;
  showMembers?: boolean;
  triggerIsAdmin?: boolean;
  secondTriggerIsAdmin?: boolean;
};

export default function HeroSpaceArea({
  current,
  type,
  children,
  triggerText,
  controls = true,
  secondControls = false,
  childrenSecond,
  triggerSecondText = "",
  showMembers = true,
  triggerIsAdmin = false,
  secondTriggerIsAdmin = false,
}: HeroSpaceAreaProps) {
  {
    const { userIsAdminOfCurrentSpace } = useAppSelector(
      (state) => state.client.spaces
    );

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
            <div className="flex gap-2">
              {secondControls && ((secondTriggerIsAdmin && userIsAdminOfCurrentSpace) ||
                  !secondTriggerIsAdmin) && (
                  <ModalTrigger
                    triggerText={triggerSecondText}
                    buttonType="secondaryButton"
                  >
                    {childrenSecond}
                  </ModalTrigger>
                )}
              <div className="flex w-full flex-row items-center justify-end gap-5">
                {type === "space" && showMembers && (
                  <MembersList
                    members={current?.members}
                    size="medium"
                    pictureHasMargin={true}
                  />
                )}
                {((triggerIsAdmin && userIsAdminOfCurrentSpace) ||
                  !triggerIsAdmin) && (
                  <ModalTrigger
                    triggerText={triggerText}
                    buttonType="primaryButton"
                  >
                    {children}
                  </ModalTrigger>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
