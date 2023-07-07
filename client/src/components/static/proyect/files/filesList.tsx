import { FilesProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
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

type FilesListProps = {
  files: FilesProps[];
};

export default function FilesList({ files }: FilesListProps) {
  return (
    <div className="grid gap-5 grid-cols-3">
      {Array.isArray(files) &&
        files.map((file: FilesProps) => <FileItem file={file} />)}
    </div>
  );
}

type FileItemProps = {
  file: FilesProps;
};

function FileItem({ file }: FileItemProps) {
  return (
    <div className="flex gap-3 rounded-3xl bg-white p-4">
      <Image
        src="/icon/file.svg"
        alt="file"
        layout="fill"
        aspectRatio="1/1"
        width="w-[90px]"
        height="h-[90px]"
      />
      <div className="flex flex-col items-start justify-between pb-2" >
        <div>
          <p className="bodyText font-medium">{file.name} | {file.type}</p>
          <p className="smalltext">{file.asignedRoom.name}</p>
        </div>
        <button className="terceryButton">Descargar</button>
      </div>
    </div>
  );
}
