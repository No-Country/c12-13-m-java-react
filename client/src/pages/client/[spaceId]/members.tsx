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
import { leaveSpace } from "@/redux/slices/client/spaces";
export default function Members() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  const [leaveSpaceVisibility, setLeaveSpaceVisibility] = useState(false);
const dispatch = useAppDispatch();
  const handleTrueAction = () => {
    console.log("Se sale del espacio");
    dispatch(leaveSpace());
  };

  return (
    <>
      <Head>
        <title>Miembros del espacio | Spaces</title>
      </Head>
      <LayoutSpaces type="client">
        <div className="flex items-center justify-between">
          <HeroSpaceArea
            current={currentSpace}
            type="space"
            controls={false}
            showMembers={false}
            triggerText="Salir del espacio"
          />
          <ConfirmationModal
            triggerText="Salir del espacio"
            confirmText="Salir del espacio"
            confirmParagraph="Estas seguro que quieres salir de este espacio?"
            triggerColor="bg-red-800"
            trueAction={handleTrueAction}
            mustConfirm={true}
          />
        </div>

        <Hr hasPadding={false} />
        <section className=" flex flex-col gap-6">
          <ListTopArea
            title="Miembros"
            description="Miembros del espacio"
            buttonText="Invitar a un amigo"
            controls={false}
          />
          <MembersSpaceList members={currentSpace.members} adminZone={false} />
        </section>
      </LayoutSpaces>
    </>
  );
}
