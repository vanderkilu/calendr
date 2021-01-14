import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { useTasks } from "../contexts/task.context";
import useCalendar from "../hooks/useCalendar";
import Cell from "../components/Cell";
import { ID } from "../utils";
import { CalendarHeaderMonth } from "../components/CalendarHeader";

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
    </>
  );
};

export default Home;
