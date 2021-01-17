import { TodoDTO } from "../dtos/todo.dto";
import { Router } from "express";
import TodoService from "../services/todo.service";
import TodoController from "../controllers/todo.controller";
import Route from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class TodoRoute implements Route {
  public path = "/todos";
  public router = Router();
  public todoController = new TodoController(new TodoService());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.todoController.getAllTodos);
    this.router.get(`${this.path}/:id`, this.todoController.getTodoById);
    this.router.delete(`${this.path}/:id`, this.todoController.deleteTodo);
    this.router.post(
      `${this.path}`,
      validationMiddleware(TodoDTO),
      this.todoController.createTodo
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(TodoDTO, true),
      this.todoController.updateTodo
    );
  }
}

export default TodoRoute;
