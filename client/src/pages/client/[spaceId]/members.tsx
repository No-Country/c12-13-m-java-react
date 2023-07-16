import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces";
import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
  HeroSpaceArea,
  Hr,
  ListTopArea,
} from "@/components";
import Head from "next/head";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { leaveSpace } from "@/redux/slices/client/spaces/spaces";
export default function Members() {
  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const [leaveSpaceVisibility, setLeaveSpaceVisibility] = useState(false);
  const dispatch = useAppDispatch();
  const handleTrueAction = () => {
    dispatch(leaveSpace());
  };

  return (
    <>
      <Head>
        <title>Miembros del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <div className="flex items-center justify-between">
          <HeroSpaceArea
            current={currentSpace}
            modalType="confirmation"
            type="space"
            controls={true}
            showMembers={false}
            triggerText="Salir del espacio"
            confirmParagraph="Estas seguro que quieres salir de este espacio?"
            handleTrueAction={handleTrueAction}
            mustConfirm={true}
          />
        </div>
           <MembersSpaceList members={currentSpace.members} adminZone={false} />
      </LayoutSpaces>
    </>
  );
}
