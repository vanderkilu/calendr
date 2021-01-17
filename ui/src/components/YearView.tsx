import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { ITask } from "../types";
import { StyledCellTask, StyledCellTaskText } from "./Cell";
import useCalendar from "../hooks/useCalendar";

const StyledMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMonthHeader = styled.h3`
  font-size: 1.5rem;
  color: #0b8043;
  text-align: center;
`;
const StyledDayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0;
`;
const StyledDay = styled.div`
  margin: 0rem;
  cursor: pointer;
`;
const StyledText = styled.p<{ isToday: boolean }>`
  font-size: 1.2rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #424242;
  background-color: ${(props) => props.isToday && "#c8e6c9"};
`;
const StyledYearContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  margin-top: 5rem;
`;
const StyledYearContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 3rem;
`;
const StyledYearTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e0e0e0;
  padding-left: 2rem;
`;
const StyledTaskDate = styled.h3`
  font-size: 1.4rem;
  color: #424242;
`;

interface MonthProps {
  days: number[];
  month: string;
  currentDay: number;
  currentMonth: string;
  dayDate: (day: number) => string;
  onClick: (date: string) => void;
}

const MonthView: React.FC<MonthProps> = ({
  days,
  month,
  currentDay,
  currentMonth,
  dayDate,
  onClick,
}) => {
  const handleOnClick = (day: number) => {
    const date = dayDate(day);
    onClick(date);
  };
  return (
    <>
      <StyledMonthContainer>
        <StyledMonthHeader>{month}</StyledMonthHeader>
        <StyledDayContainer>
          {days.map((day) =>
            day === 0 ? (
              <StyledDay key={day}></StyledDay>
            ) : (
              <StyledDay key={day} onClick={() => handleOnClick(day)}>
                <StyledText
                  isToday={day === currentDay && month === currentMonth}
                >
                  {day}
                </StyledText>
              </StyledDay>
            )
          )}
        </StyledDayContainer>
      </StyledMonthContainer>
    </>
  );
};

interface YearProps {
  date: moment.Moment;
  tasks: ITask[];
  onCellTaskClick: (id: string) => void;
}

const YearView: React.FC<YearProps> = ({ date, tasks, onCellTaskClick }) => {
  const { generateDates } = useCalendar(date, tasks);
  const monthDates = generateDates();
  const [selectedDate, setSelectedDate] = useState("");
  const tasksForDate = tasks.filter((task) => task.dueDate === selectedDate);
  const formattedDate = moment(selectedDate).format("DD/MMM/YYYY");
  const handleOnClick = (date: string) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <>
      <StyledYearContainer>
        <StyledYearContent>
          {monthDates.map(
            ({ month, days, dayDate, currentDay, currentMonth }) => (
              <MonthView
                days={days}
                month={month}
                dayDate={dayDate}
                currentDay={currentDay}
                currentMonth={currentMonth}
                onClick={handleOnClick}
                key={month}
              />
            )
          )}
        </StyledYearContent>
        <StyledYearTaskContainer>
          {selectedDate !== "" && (
            <StyledTaskDate>{formattedDate}</StyledTaskDate>
          )}
          {tasksForDate.map((task) => (
            <StyledCellTask onClick={() => onCellTaskClick(task.id)}>
              <StyledCellTaskText canStrike={task.status === "completed"}>
                {task.name}
              </StyledCellTaskText>
            </StyledCellTask>
          ))}
        </StyledYearTaskContainer>
      </StyledYearContainer>
    </>
  );
};

export default YearView;
