import { MembersProps } from "@/utils/types/client";

export class TasksProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: number;
  assignedTo: MembersProps[];
  comments: CommentsProps[];

  constructor(
    id: string,
    title: string,
    description: string,
    deadline: string,
    status: number,
    assignedTo: MembersProps[],
    comments: CommentsProps[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
    this.assignedTo = assignedTo;
    this.comments = comments;
  }

  static deserialize(data: any): TasksProps {
    return new TasksProps(
      data.id,
      data.title,
      data.description,
      data.deadline,
      data.status,
      data.assignedTo,
      data.comments
    );
  }

  static deserializeList(data: any[]): TasksProps[] {
    return data.map((task) => TasksProps.deserialize(task));
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getDeadline(): string {
    return this.deadline;
  }

  getStatus(): number {
    return this.status;
  }

  getAssignedTo(): MembersProps[] {
    return this.assignedTo;
  }

  getComments(): CommentsProps[] {
    return this.comments;
  }

getFormattedStatus(): (string | number) {
  switch (this.status) {
    case 1:
      return "To Do";
    case 2:
      return "En progreso";
    case 3:
      return "Completado";
    default:
      return "To Do";
  }
}


}

export type CommentsProps = {
  id: string;
  content: string;
  createdAt: string;
  createdBy: MembersProps;
};
