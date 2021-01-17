import { TodoDTO } from "dtos/todo.dto";
import { NextFunction, Request, Response } from "express";
import { ITodoService } from "interfaces/todo.service.interface";

class TodoController {
  private todoService: ITodoService;

  constructor(todoService: ITodoService) {
    this.todoService = todoService;
  }

  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    const todoId = req.params.id;
    try {
      const todo = await this.todoService.getTodoById(todoId);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    const todoData: TodoDTO = req.body;
    try {
      const todo = await this.todoService.createTodo(todoData);
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    const todoId = req.params.id;
    const todoData: TodoDTO = req.body;
    try {
      const todo = this.todoService.updateTodo(todoData, todoId);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const todoId = req.params.id;
    try {
      await this.todoService.deleteTodo(todoId);
      res.status(200).json({ msg: "Todo item deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default TodoController;
