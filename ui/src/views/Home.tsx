import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { useTasks } from "../contexts/task.context";
import useCalendar from "../hooks/useCalendar";
import Cell, { StyledCellTask, StyledCellTaskText } from "../components/Cell";
import { ID } from "../utils";
import { CalendarHeaderMonth } from "../components/CalendarHeader";
import TaskModal from "../components/TaskOverFlowModal";
import TaskForm from "../components/TaskCreateForm";
import TaskPreview from "../components/TaskPreviewForm";
import { ITask } from "../types";
import TaskEditForm from "../components/TaskEditForm";
import {
  StyledControlWrapper,
  StyledControlGroup,
} from "../components/SharedStyles";
import Control from "../components/Control";
import Button from "../components/Button";
import Switch, { StyledGroupSwitch } from "../components/Switch";
import YearView from "../components/YearView";
import { fetchTodos } from "../api/todo.api";

const StyledCellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const Home = () => {
  const [date, setDate] = useState(moment());
  const { state, dispatch } = useTasks();
  const { daysWithTasks, todayDate } = useCalendar(date, state.taskList);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask>(null);
  const [view, setView] = useState<"month" | "year">("month");

  const [isTaskCreateVisible, setIsTaskCreateVisible] = useState(false);
  const [isTaskPreviewVisible, setIsTaskPreviewVisible] = useState(false);
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);
  const [isTaskEditVisible, setIsTaskEditVisible] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const tasks = await fetchTodos();
      dispatch({ type: "ADD_TASKS", payload: { tasks } });
    };
    getTodos();
  }, []);

  const taskForSelectedDate = state.taskList.filter(
    (task) => task.dueDate === selectedDate
  );

  const updateDate = (type: moment.unitOfTime.All, index: number) => {
    setDate(moment(date).set(type, index));
  };

  const handleOnCellClick = (passed: boolean, dateStr: string) => {
    if (passed) return;
    setSelectedDate(dateStr);
    setIsTaskCreateVisible(true);
  };

  const handleOnCellTaskClick = (id: string) => {
    const task = state.taskList.find((task) => task.id === id);
    setSelectedTask(task);
    setIsTaskPreviewVisible(true);
  };

  const handleOnOverFlowClick = (e: ChangeEventType, dateStr: string) => {
    e.stopPropagation();
    setSelectedDate(dateStr);
    setIsOverflowVisible(true);
  };

  const handleOnOverFlowTaskClick = (id: string) => {
    handleOnCellTaskClick(id);
    setIsOverflowVisible(false);
  };

  const handleOnTaskSave = (task: ITask, type: "SAVE" | "EDIT") => {
    if (type === "SAVE") {
      dispatch({ type: "ADD_TASK", payload: { task } });
      setIsTaskCreateVisible(false);
    } else {
      dispatch({ type: "UPDATE_TASK", payload: { task } });
      setIsTaskEditVisible(false);
    }
  };

  const handleNewTaskCreate = () => {
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setIsTaskCreateVisible(true);
  };

  const handleOnTaskDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: { id: selectedTask.id } });
    setIsTaskPreviewVisible(false);
  };

  const handleOnTaskEdit = () => {
    setIsTaskPreviewVisible(false);
    setIsTaskEditVisible(true);
  };

  const handleOnStatusUpdate = (task: ITask, type: "SAVE" | "EDIT") => {
    handleOnTaskSave(task, type);
    setIsTaskPreviewVisible(false);
  };

  return (
    <>
      <StyledControlWrapper>
        <Button onClick={handleNewTaskCreate} text="Add new task" size={150} />
        <StyledGroupSwitch>
          <Switch id="month" onClick={() => setView("month")} />
          <Switch id="year" onClick={() => setView("year")} />
        </StyledGroupSwitch>
        <StyledControlGroup>
          <Control date={date} type="month" setDate={updateDate} key={ID()} />
          <Control date={date} type="year" setDate={updateDate} key={ID()} />
        </StyledControlGroup>
      </StyledControlWrapper>

      {view === "month" && <CalendarHeaderMonth />}
      {view === "month" ? (
        <StyledCellContainer>
          {daysWithTasks.map((task) => (
            <Cell
              task={task}
              today={todayDate}
              onClick={handleOnCellClick}
              key={ID()}
              onCellTaskClick={handleOnCellTaskClick}
              onOverflowClick={handleOnOverFlowClick}
            />
          ))}
        </StyledCellContainer>
      ) : (
        <YearView
          date={date}
          tasks={state.taskList}
          onCellTaskClick={handleOnCellTaskClick}
        />
      )}

      <TaskModal
        isOpen={isOverflowVisible}
        onClose={() => setIsOverflowVisible(false)}
        width={25}
      >
        {taskForSelectedDate.map((task) => (
          <StyledCellTask
            onClick={() => handleOnOverFlowTaskClick(task.id)}
            key={task.id}
          >
            <StyledCellTaskText canStrike={task.status === "completed"}>
              {task.name}
            </StyledCellTaskText>
          </StyledCellTask>
        ))}
      </TaskModal>
      <TaskForm
        defaultDate={selectedDate}
        isOpen={isTaskCreateVisible}
        onClose={() => setIsTaskCreateVisible(false)}
        width={50}
        onSave={handleOnTaskSave}
      />
      {isTaskEditVisible && (
        <TaskEditForm
          task={selectedTask}
          onClose={() => setIsTaskEditVisible(false)}
          width={50}
          onSave={handleOnTaskSave}
        />
      )}
      {isTaskPreviewVisible && (
        <TaskPreview
          task={selectedTask}
          onDelete={handleOnTaskDelete}
          onEdit={handleOnTaskEdit}
          onUpdateStatus={handleOnStatusUpdate}
          onClose={() => setIsTaskPreviewVisible(false)}
          width={30}
        />
      )}
    </>
  );
};

export default Home;
