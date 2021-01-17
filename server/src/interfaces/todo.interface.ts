export interface Todo {
  _id: string;
  name: string;
  description: string;
  status: string;
  priority: number;
  dueDate: string;
  createAt?: string;
}
