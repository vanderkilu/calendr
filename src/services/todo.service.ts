import HttpException from "../exceptions/HttpException";
import todoModel from "../models/todo.model";
import { isEmptyObject } from "../utils/util";
import { TodoDTO } from "../dtos/todo.dto";
import { Todo } from "../interfaces/todo.interface";
import { ITodoService } from "../interfaces/todo.service.interface";

class TodoService implements ITodoService {
  public todos = todoModel;

  public async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todos.find({}).sort({ createdAt: "desc" });
    return todos;
  }

  public async getTodoById(todoId: string): Promise<Todo> {
    const todo = await this.todos.findById(todoId);
    if (!todo) {
      throw new HttpException(404, `Todo with ${todoId} not found`);
    }
    return todo;
  }

  public async createTodo(todoData: TodoDTO): Promise<Todo> {
    if (isEmptyObject(todoData)) {
      throw new HttpException(400, "Provide all required todo data");
    }

    const newTodo = this.todos.create({ ...todoData });
    return newTodo;
  }

  public async updateTodo(todoData: TodoDTO, todoId: string): Promise<Todo> {
    if (isEmptyObject(todoData)) {
      throw new HttpException(400, "Provide all required todo data");
    }
    const updatedTodo = await this.todos.findByIdAndUpdate(todoId, todoData, {
      new: true,
    });

    return updatedTodo;
  }

  public async deleteTodo(todoId: string): Promise<Todo> {
    const todo = await this.todos.findById(todoId);
    if (!todo) {
      throw new HttpException(404, `Todo with ${todoId} not found`);
    }
    const deletedTodo = await todo.remove();
    return deletedTodo;
  }
}

export default TodoService;
