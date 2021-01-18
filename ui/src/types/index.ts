export interface ITask {
  id: string;
  name: string;
  description?: string;
  dueDate: string;
  status: "inprogress" | "completed";
  priority: 1 | 2 | 3;
  createdAt?: string;
}

export type TaskCreate = Omit<ITask, "id" | "dueDate">;
export type Todo = Omit<ITask, "id">;

export interface ICell {
  day: number;
  passed: boolean;
  dateStr: string;
  tasks: ITask[];
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
