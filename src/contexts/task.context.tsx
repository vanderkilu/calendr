import React, { useReducer, useContext } from "react";
import {
  TaskAction,
  TaskState,
  InitialTaskState,
  TaskReducer,
} from "../reducers/task.reducer";

type ContextProps = {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

const TaskContext = React.createContext<ContextProps>({
  state: InitialTaskState,
  dispatch: () => InitialTaskState,
});

export const TaskProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(TaskReducer, InitialTaskState);
  return (
    <TaskContext.Provider
      value={{ state, dispatch }}
      {...props}
    ></TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks should be called within Task Provider");
  }
  return context;
};
