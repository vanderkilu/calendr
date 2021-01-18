import { TodoDTO } from "../dtos/todo.dto";
import { Todo } from "./todo.interface";

export interface ITodoService {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(todoId: string): Promise<Todo>;
  createTodo(todoData: TodoDTO): Promise<Todo>;
  updateTodo(todoData: TodoDTO, todoId: string): Promise<Todo>;
  deleteTodo(todoId: string): Promise<Todo>;
}
