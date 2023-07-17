import { ModalTrigger, MembersList, ConfirmationModal } from "@/components";
import { RoomsProps, SpaceProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import NextImage from "next/image";

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
  modalType?: "confirmation" | "normal";
  confirmParagraph?: string;
  handleTrueAction?: () => void;
  mustConfirm?: boolean;
  bgImageVisibleOnDesktop?: boolean;
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
  modalType = "normal",
  confirmParagraph = "",
  handleTrueAction = () => {},
  mustConfirm = false,
  bgImageVisibleOnDesktop = false,
}: HeroSpaceAreaProps) {
  {
    const { currentMember } = useAppSelector(
      (state) => state.client.spaces.spaces
    );

    return (
      <section className="heroSpContainer">
        <ImageOverlay
          current={current}
          bgImageVisibleOnDesktop={bgImageVisibleOnDesktop}
        />
        <div className="z-0  flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="w-full">
            <h1 className="titulo-1 text-white">{current?.name}</h1>
            <p className="bodyText font-light text-white lg:max-w-[75%]">
              {current?.description}
            </p>
          </div>
          {controls && (
            <div className="flex  gap-2">
              {secondControls &&
                ((secondTriggerIsAdmin &&
                  (currentMember.isAdmin() || currentMember.isOwner())) ||
                  !secondTriggerIsAdmin) && (
                  <ModalTrigger
                    triggerText={triggerSecondText}
                    buttonType="secondaryButton"
                  >
                    {childrenSecond}
                  </ModalTrigger>
                )}
              <div className="flex  w-full flex-row-reverse items-center justify-end gap-4 lg:flex-row">
                {type === "space" && showMembers && (
                  <MembersList
                    members={current?.members}
                    size="medium"
                    pictureHasMargin={true}
                  />
                )}
                {((triggerIsAdmin &&
                  (currentMember.isAdmin() || currentMember.isOwner())) ||
                  !triggerIsAdmin) &&
                  modalType === "normal" && (
                    <ModalTrigger
                      triggerText={triggerText}
                      buttonType="primaryButton"
                    >
                      {children}
                    </ModalTrigger>
                  )}
                {((triggerIsAdmin &&
                  (currentMember.isAdmin() || currentMember.isOwner())) ||
                  !triggerIsAdmin) &&
                  modalType === "confirmation" && (
                    <ConfirmationModal
                      triggerText={triggerText}
                      confirmText={triggerText}
                      confirmParagraph={confirmParagraph}
                      triggerColor="bg-red-800"
                      trueAction={handleTrueAction}
                      mustConfirm={mustConfirm}
                    />
                  )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  type ImageOverlayProps = {
    current: SpaceProps | RoomsProps;
    bgImageVisibleOnDesktop: boolean;
  };

  function ImageOverlay({
    current,
    bgImageVisibleOnDesktop,
  }: ImageOverlayProps) {
    return (
      <div className=" z[-1] absolute left-0 right-0 top-0  h-full w-full">
        <div className="absolute left-0 right-0 top-0 z-[-1]  h-full w-full backdrop-brightness-50 " />
        <NextImage
          src={current?.coverImage}
          alt="SpaceCover"
          layout="fill"
          className={`left-0 right-0 top-0 z-[-2] h-full w-full object-cover  ${
            !bgImageVisibleOnDesktop && "lg:hiddens"
          } `}
        />
      </div>
    );
  }
}
