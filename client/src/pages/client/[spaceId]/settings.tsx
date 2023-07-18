import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteSpace, editSpace } from "@/redux/slices/client/spaces/spaces";
import Head from "next/head";
import { GeneralPermission } from "@/utils/types/client";
import { SpaceProps } from "@/utils/types/client";
import {
  LayoutSpaces,
  MembersSpaceList,
  HeroSpaceArea,
  EditManager,
  SpaceEditForm,
} from "@/components";

export default function SpaceSettings() {
  const dispatch = useAppDispatch();

  const { currentSpace: cSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);

  const [processedData, setProcessedData] = useState<any>(currentSpace);
  const [nowEditing, setNowEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);

  const handleSave = async (editedData: any) => {
    setLoading(true);
    await dispatch(editSpace(editedData));
    setManualClose(true);

    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteSpace());
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
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
          primaryLoading={loading}
          primaryManualClose={manualClose}
        >
          <>
            <EditManager
              processedData={processedData}
              originalData={currentSpace}
              title="Editar espacio"
              deleteAction={handleDelete}
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
