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
  const handleClick = () => {};
  const handleOnCellTaskClick = () => {};
  const handleOnOverFlowClick = () => {};
  const handleOnDragStart = () => {};
  const handleOnDrop = () => {};
  const handleOnDragOver = () => {};
  return (
    <>
      <CalendarHeaderMonth />
      <CellContainer>
        {daysWithTasks.map((task) => (
          <Cell
            task={task}
            today={todayDate}
            onClick={handleClick}
            key={ID()}
            onCellTaskClick={handleOnCellTaskClick}
            onOverflowClick={handleOnOverFlowClick}
            onDragStart={handleOnDragStart}
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
          />
        ))}
      </CellContainer>
      <TaskModal isOpen={false} onClose={() => null} width={25}>
        {[1, 2, 3, 4, 5].map((i) => (
          <CellTask>{i}</CellTask>
        ))}
      </TaskModal>
      {/* <TaskForm
        isOpen={false}
        onClose={() => null}
        width={50}
        onDelete={() => null}
        onSave={() => null}
        onEdit={() => null}
      ></TaskForm> */}
      <TaskPreview isOpen={true} onClose={() => null} width={30}></TaskPreview>
    </>
  );
};

export default Home;
