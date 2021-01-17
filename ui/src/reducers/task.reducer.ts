import { ITask } from "../types";

export interface TaskState {
  taskList: ITask[];
  isLoading: boolean;
  error: string | null;
}

export const InitialTaskState = {
  taskList: [],
  isLoading: false,
  error: null,
};

export type TaskAction =
  | { type: "ADD_TASKS"; payload: { tasks: ITask[] } }
  | { type: "ADD_TASK"; payload: { task: ITask } }
  | { type: "UPDATE_TASK"; payload: { task: ITask } }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { id: string; status: "inprogress" | "completed" };
    };

export function TaskReducer(
  state: TaskState = InitialTaskState,
  action: TaskAction
): TaskState {
  switch (action.type) {
    case "ADD_TASKS":
      return {
        ...state,
        error: null,
        isLoading: false,
        taskList: action.payload.tasks,
      };
    case "ADD_TASK":
      return {
        ...state,
        taskList: [...state.taskList, action.payload.task],
      };
    case "DELETE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    default:
      return state;
  }
}
