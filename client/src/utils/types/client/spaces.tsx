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
};

export type MembersProps = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
};

export type RoomsProps = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  createdAt: string;
  lastModified: string;
  tasks: TasksProps[];
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
