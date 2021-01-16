import React from "react";
import styled, { css } from "styled-components";
import { ICell } from "../types";
import { ID } from "../utils";

export const StyledCell = styled.div<{ isToday: boolean }>`
  height: 10rem;
  position: relative;
  background-color: ${(props) => (props.isToday ? "#c8e6c9" : "transparent")};
  border: 1px solid #f3f4f9;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 1.2rem;
`;
const StyledCellText = styled.p`
  position: absolute;
  right: 0.5rem;
  top: -1rem;
  font-size: 1.5rem;
  color: "#b8bac3";
`;
export const StyledCellTask = styled.div`
  padding: 0.4rem;
  border-radius: 3px;
  background-color: #0b8043;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  overflow: hidden;
`;
const StyledCellTaskText = styled.p<{ canStrike: boolean }>`
  font-size: 1rem;
  color: #ffffff;
  padding: 0;
  margin: 0;
  ${(props) =>
    props.canStrike &&
    css`
      text-decoration: line-through;
    `}
`;
const StyledManyTask = styled.div`
  color: "#b8bac3";
  font-size: 1.1rem;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
`;

interface CellProps {
  task: ICell;
  onClick: (passed: boolean, dateStr: string) => void;
  today: number;
  onCellTaskClick: (id: string) => void;
  onOverflowClick: (e: ChangeEventType, dateStr: string) => void;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const Cell: React.FC<CellProps> = ({
  task,
  today,
  onClick,
  onCellTaskClick,
  onOverflowClick,
}) => {
  const { day, passed, dateStr, tasks } = task;

  const handleClick = (passed: boolean, dateStr: string) => {
    onClick(passed, dateStr);
  };
  const hasTasks = tasks && tasks.length > 0;
  const isManyTasks = tasks && tasks.length > 3;
  const tasksToShow = isManyTasks ? tasks.slice(0, 3) : tasks;
  const overDue = tasks.length - 3;

  const handleOnEventCellClick = (e: ChangeEventType, id: string) => {
    onCellTaskClick(id);
    e.stopPropagation();
  };
  return (
    <StyledCell
      key={ID()}
      isToday={day === today}
      onClick={() => handleClick(passed, dateStr)}
    >
      {!passed && <StyledCellText>{day}</StyledCellText>}
      {hasTasks &&
        tasksToShow.map((task) => (
          <StyledCellTask
            onClick={(e: ChangeEventType) => handleOnEventCellClick(e, task.id)}
            key={ID()}
          >
            {task && (
              <StyledCellTaskText canStrike={task.status === "completed"}>
                {task.name}
              </StyledCellTaskText>
            )}
          </StyledCellTask>
        ))}
      {isManyTasks && (
        <StyledManyTask
          onClick={(e: ChangeEventType) => onOverflowClick(e, dateStr)}
        >
          +{overDue}
        </StyledManyTask>
      )}
    </StyledCell>
  );
};

export default Cell;
