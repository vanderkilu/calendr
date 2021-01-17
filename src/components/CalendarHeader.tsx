import React from "react";
import styled, { css } from "styled-components";
import moment from "moment";

const Header = styled.div<{
  padding?: number;
  align?: string;
  adjust?: number;
}>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f3f4f9;
  justify-items: center;
  margin-top: 2rem;
  padding: ${(props) => props.padding || "2rem"};
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.adjust &&
    css`
      margin-left: ${props.adjust}rem;
    `}
`;
const Day = styled.div`
  font-size: 1.2rem;
  color: #424242;
`;

const weekDays = moment.weekdaysShort();

export const CalendarHeaderMonth: React.FC<{}> = () => {
  return (
    <>
      <Header>
        {weekDays.map((day) => (
          <Day key={day}>{day}</Day>
        ))}
      </Header>
    </>
  );
};
