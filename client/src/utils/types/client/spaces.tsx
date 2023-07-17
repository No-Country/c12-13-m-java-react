export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  email: string;
  isSuperAdmin: boolean;
  softDelete: boolean;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  spaces: SpaceProps[];
};

export type SpaceProps = {
  id: string;
  name: string;
  accessCode: string;
  description: string;
  coverImage: string;
  createdAt: string;
  lastModified: string;
  members: MembersProps[];
  rooms: RoomsProps[];
  files: FilesProps[];
};

// export type MembersProps = {
//   user: User;
//   role: string;
// };

export enum GeneralPermission {
  CreateSpace = "createSpace",
  EditSpace = "editSpace",
  DeleteSpace = "deleteSpace",
  CreateRoom = "createRoom",
  DeleteRoom = "deleteRoom",
  EditMemberRole = "editMemberRole",
  DeleteMember = "deleteMember",
  DeleteTask = "deleteTask",
  // Agrega más permisos según tus necesidades
}

type RolePermissions = {
  [role: string]: GeneralPermission[];
};

const rolePermissions: RolePermissions = {
  owner: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.DeleteSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
  ],
  admin: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
  ],
  member: [GeneralPermission.CreateSpace, GeneralPermission.DeleteTask],
  // Asigna los permisos según tus necesidades y roles
};

export class MembersProps {
  user: User;
  role: string;

  constructor(user: User, role: string) {
    this.user = user;
    this.role = role;
  }

  getUser(): User {
    return this.user;
  }

  getRole(): string {
    return this.role;
  }

  getFullName(): string {
    return this.user.firstName + " " + this.user.lastName;
  }

  getFormattedRole(): string {
    if (this.role === "owner") {
      return "Propietario";
    } else if (this.role === "admin") {
      return "Administrador";
    } else {
      return "Miembro";
    }
  }

  getId(): string {
    return this.user.id;
  }

  hasPermission(permission: GeneralPermission): boolean {
    const permissions = rolePermissions[this.role];
    return permissions ? permissions.includes(permission) : false;
  }

  isOwner(): boolean {
    return this.role === "owner";
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }
}

export type RoomsProps = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  createdAt: string;
  lastModified: string;
  tasks: TasksProps[];
  members: MembersProps[]; //Ignorar
};

export type TasksProps = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lastModified: string;
  deadline: string;
  status: number;
  assignedTo: MembersProps[];
  comments: CommentsProps[];
  tags: TagsProps[];
};

export type CommentsProps = {
  id: string;
  content: string;
  createdAt: string;
  createdBy: MembersProps;
};

export type TagsProps = {
  id: string;
  name: string;
  color: string;
};

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

export type ChatProps = {
  id: string;
  messages: MessageProps[];
};

export type MessageProps = {
  id: string;
  content: string;
  createdAt: string;
  fromUser: User;
};
