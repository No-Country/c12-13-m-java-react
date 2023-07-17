import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteSpace, editSpace } from "@/redux/slices/client/spaces/spaces";
import Head from "next/head";
import { GeneralPermission } from "@/utils/types/client/spaces";
import {
  LayoutSpaces,
  MembersSpaceList,
  HeroSpaceArea,
  EditManager,
  SpaceEditForm,
} from "@/components";

export default function SpaceSettings() {
  const dispatch = useAppDispatch();

  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

  const [processedData, setProcessedData] = useState<any>(currentSpace);
  const [nowEditing, setNowEditing] = useState<boolean>(false);

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
              deletePermission={GeneralPermission.DeleteSpace}
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
        <MembersSpaceList adminZone={true} />
      </LayoutSpaces>
    </>
  );
}
