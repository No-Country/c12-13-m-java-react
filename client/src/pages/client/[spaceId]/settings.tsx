import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteSpace, editSpace } from "@/redux/slices/client/spaces/spaces";
import router from "next/router";
import Head from "next/head";
import {
  LayoutSpaces,
  MembersSpaceList,
  HeroSpaceArea,
  ListTopArea,
  Hr,
  EditManager,
  SpaceEditForm,
} from "@/components";

export default function SpaceSettings() {
  const dispatch = useAppDispatch();

  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const { id } = useAppSelector((state) => state.authSession.session.current);

  const [processedData, setProcessedData] = useState<any>(currentSpace);
  const [nowEditing, setNowEditing] = useState<boolean>(false);

  useEffect(() => {
    const isAdmin = Boolean(
      currentSpace.members.find(
        (member: any) => member.user.id === id && member.role === "admin"
      )
    );
    if (!isAdmin) {
      router.push(`/client/${currentSpace.id}`);
    }
  }, [currentSpace]);

  const handleSave = async (editedData: any) => {
    await dispatch(editSpace(editedData));
  };

  return (
    <>
      <Head>
        <title>Configuracion del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Editar espacio"
        >
          <>
            <EditManager
              processedData={processedData}
              originalData={currentSpace}
              title="Editar espacio"
              deleteAction={deleteSpace}
              route={`/client`}
              nowEditing={nowEditing}
              editAction={(editedData: any) => handleSave(editedData)}
            >
              <SpaceEditForm
                originalData={currentSpace}
                processedData={processedData}
                setProcessedData={setProcessedData}
                setNowEditing={setNowEditing}
              />
            </EditManager>
          </>
        </HeroSpaceArea>

        <MembersSpaceList members={currentSpace.members} adminZone={true} />
      </LayoutSpaces>
    </>
  );
}
