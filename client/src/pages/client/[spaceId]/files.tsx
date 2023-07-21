import { LayoutSpaces, FilesList, HeroSpaceArea, FileForm, FileCreate } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import { SpaceProps } from "@/utils/types/client";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { useState } from "react";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";


export default function SpaceSettings() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);

  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});


  const { currentSpaceFiles } = useAppSelector(
    (state) => state?.client?.spaces?.files
  );

  const { currentSpace: cSpace } = useAppSelector(
    (state) => state?.client?.spaces.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);



  return (
    <>
      <Head>
        <title>Archivos del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="room"
          controls={true}
          triggerText="Subir un archivo"
          primaryLoading={loading}
          primaryManualClose={manualClose}
        >
          <FileCreate 
            setManualClose={setManualClose}
            setLoading={setLoading}
          
          />
        </HeroSpaceArea>
        <FilesList files={currentSpaceFiles} />
      </LayoutSpaces>
    </>
  );
}


