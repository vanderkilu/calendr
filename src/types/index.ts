export interface ITask {
  id: string;
  name: string;
  description?: string;
  dueDate: string;
  status: "inprogress" | "completed";
  priority: 1 | 2 | 3;
}

export type TaskCreate = Omit<ITask, "id">;

export interface ICell {
  day: number;
  passed: boolean;
  dateStr: string;
  tasks: ITask[];
}
