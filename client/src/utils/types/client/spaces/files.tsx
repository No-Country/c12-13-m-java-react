import { MembersProps, RoomsProps } from "@/utils/types/client";

export type FilesProps = {
    id: string;
    name: string;
    description: string;
    type: "image" | "video" | "audio" | "document";
    src: string;
    lastModified: string;
    createdAt: string;
    owner: MembersProps;
    asignedRoom: RoomsProps;
  };