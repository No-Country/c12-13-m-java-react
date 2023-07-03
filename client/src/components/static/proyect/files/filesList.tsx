import { FilesProps } from "@/utils/types/client/spaces";

type FilesListProps = {
  files: FilesProps[];
};

export default function FilesList({ files }: FilesListProps) {
  return (
    <div className="flex flex-col">
      {Array.isArray(files) &&
        files.map((file: FilesProps) => (
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-white p-5">
            <div className="flex w-full items-center justify-start gap-2">
              <p className="text-center">{file?.name}</p>
              <p className="text-center">{file?.description}</p>
              <p className="text-center">{file?.type}</p>
              <p className="text-center">{file?.asignedRoom.name}</p>
              <form action={file?.src} method="get" target="_blank">
                <button type="submit" className="bg-blue-600 text-center">
                  Descargar
                </button>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
}
