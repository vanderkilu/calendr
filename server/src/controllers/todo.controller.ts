import { TodoDTO } from "../dtos/todo.dto";
import { NextFunction, Request, Response } from "express";
import { ITodoService } from "../interfaces/todo.service.interface";

class TodoController {
  private todoService: ITodoService;

  constructor(todoService: ITodoService) {
    this.todoService = todoService;
  }

  getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  };

  getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
      const todo = await this.todoService.getTodoById(todoId);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  };

  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoData: TodoDTO = req.body;
    try {
      const todo = await this.todoService.createTodo(todoData);
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  };

  updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    const todoData: TodoDTO = req.body;
    try {
      this.todoService.updateTodo(todoData, todoId);
      res.status(200).json({ msg: "Todo item updated successfully" });
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
      await this.todoService.deleteTodo(todoId);
      res.status(200).json({ msg: "Todo item deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default TodoController;
