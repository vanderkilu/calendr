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
import { ITask, TaskCreate } from "../types";

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

  const [isTaskCreateVisible, setIsTaskCreateVisible] = useState(false);
  const [isTaskPreviewVisible, setIsTaskPreviewVisible] = useState(false);
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);

  const handleOnCellClick = (passed: boolean, dateStr: string) => {
    if (passed) return;
    setSelectedDate(dateStr);
    setIsTaskCreateVisible(true);
  };
  const handleOnCellTaskClick = () => {};
  const handleOnOverFlowClick = () => {};

  const handleOnTaskSave = (task: ITask) => {
    dispatch({ type: "ADD_TASK", payload: { task } });
    setIsTaskCreateVisible(false);
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
      <TaskPreview
        isOpen={isTaskPreviewVisible}
        onClose={() => setIsTaskPreviewVisible(false)}
        width={30}
      />
    </>
  );
};

export default Home;
