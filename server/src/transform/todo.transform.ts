import { Todo } from "../interfaces/todo.interface";

export function transformTodo(todo: Todo) {
  return {
    id: todo._id,
    name: todo.name,
    description: todo.description,
    dueDate: todo.dueDate,
    status: todo.status,
    priority: todo.priority,
    createdAt: todo.createAt,
  };
}

export function transformTodoList(todos: Todo[]) {
  return todos.map(transformTodo);
}
