import { MembersProps, RoomsProps, UserProps } from "@/utils/types/client";

export class SpaceProps {
  id: string;
  name: string;
  accessCode: string;
  description: string;
  coverImage: string;
  rooms?: RoomsProps[];
  members?: MembersProps[];

  constructor(
    id: string,
    name: string,
    accessCode: string,
    description: string,
    coverImage: string,
    rooms?: RoomsProps[],
    members?: MembersProps[], //Ignorar

    

  ) {
    this.id = id;
    this.name = name;
    this.accessCode = accessCode;
    this.description = description;
    this.coverImage = coverImage;
    this.rooms = rooms;
    this.members = members;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAccessCode(): string {
    return this.accessCode;
  }

  getDescription(): string {
    return this.description;
  }

  getCoverImage(): string {
    return this.coverImage;
  }

  getRooms(): RoomsProps[] {
    if(!this.rooms) return [];
    return this.rooms;
  }

  getMembers(): MembersProps[] {
    console.log("this", this);
    if(!this.members) return [];
    return this.members;
  }

  static deserialize(input: any): SpaceProps {
    return new SpaceProps(
      input.id,
      input.name,
      input.accessCode,
      input.description,
      input.coverImage,
      input.rooms,
      input.members
    );
  }
}



// export type RoomsProps = {
//   id: string;
//   name: string;
//   description: string;
//   coverImage: string;
//   createdAt: string;
//   lastModified: string;
//   tasks: TasksProps[];
//   members: MembersProps[]; //Ignorar
// };









