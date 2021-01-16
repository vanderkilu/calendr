import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { useTasks } from "../contexts/task.context";
import useCalendar from "../hooks/useCalendar";
import Cell from "../components/Cell";
import { ID } from "../utils";
import { CalendarHeaderMonth } from "../components/CalendarHeader";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskCreateForm";
import TaskPreview from "../components/TaskPreviewForm";
import { ITask } from "../types";
import TaskEditForm from "../components/TaskEditForm";

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CellTask = styled.div`
  padding: 0.4rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  overflow: hidden;
`;

const Home = () => {
  const [date, setDate] = useState(moment());
  const { state, dispatch } = useTasks();
  const { daysWithTasks, todayDate } = useCalendar(date, state.taskList);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask>(null);

  const [isTaskCreateVisible, setIsTaskCreateVisible] = useState(false);
  const [isTaskPreviewVisible, setIsTaskPreviewVisible] = useState(false);
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);
  const [isTaskEditVisible, setIsTaskEditVisible] = useState(false);

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

  const handleOnOverFlowClick = () => {};

  const handleOnTaskSave = (task: ITask, type: "SAVE" | "EDIT") => {
    if (type === "SAVE") {
      dispatch({ type: "ADD_TASK", payload: { task } });
      setIsTaskCreateVisible(false);
    } else {
      dispatch({ type: "UPDATE_TASK", payload: { task } });
      setIsTaskEditVisible(false);
    }
  };

  const handleOnTaskDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: { id: selectedTask.id } });
    setIsTaskPreviewVisible(false);
  };

  const handleOnTaskEdit = () => {
    setIsTaskPreviewVisible(false);
    setIsTaskEditVisible(true);
  };

  const handleOnStatusUpdate = () => {
    const status =
      selectedTask.status === "completed" ? "inprogress" : "completed";
    dispatch({
      type: "UPDATE_TASK",
      payload: { task: { ...selectedTask, status } },
    });
    setIsTaskPreviewVisible(false);
  };

  return (
    <>
      <CalendarHeaderMonth />
      <CellContainer>
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
      </CellContainer>
      <TaskModal
        isOpen={isOverflowVisible}
        onClose={() => setIsOverflowVisible(false)}
        width={25}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <CellTask>{i}</CellTask>
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
