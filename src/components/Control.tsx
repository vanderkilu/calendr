import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import nextIcon from "../assets/next.svg";
import backIcon from "../assets/back.svg";

const StyledControl = styled.div`
  position: relative;
  width: 15rem;
  height: 3rem;
  border-radius: 5px;
  border: 1px solid #b8bac3;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  cursor: pointer;
`;
const ControlLeft = styled.span`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  font-size: 2rem;
  transform: translateY(-50%);
  padding: 2rem 0;
  cursor: pointer;
`;
const ControlRight = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  font-size: 2rem;
  transform: translateY(-50%);
  padding: 2rem 0;
  cursor: pointer;
`;

const StyledControlIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

type ControlType = moment.unitOfTime.All;
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ControlProps {
  setDate: (type: ControlType, index: number) => void;
  date: string | moment.Moment;
  type: ControlType;
}

const Control: React.FC<ControlProps> = ({ setDate, date, type }) => {
  const months = moment.months();
  let [index, setIndex] = useState(moment(date).month());
  const setNextMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index < months.length - 1) {
      setIndex(index + 1);
      setDate("month", index + 1);
    } else {
      setIndex(months.length - 1);
      setDate("month", index);
    }
  };
  const setPrevMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index > 0) {
      setIndex(index - 1);
      setDate("month", index - 1);
    } else {
      setIndex(0);
      setDate("month", index);
    }
  };
  const getCurrentYear = () => moment(date).format("Y");

  const year = parseInt(getCurrentYear());

  const setNextYear = (e: ButtonClickEvent) => {
    e.stopPropagation();
    setDate("year", year + 1);
  };

  const setPrevYear = (e: ButtonClickEvent) => {
    e.stopPropagation();
    setDate("year", year - 1);
  };

  const value = type === "month" ? months[index] : year;
  return (
    <>
      <StyledControl>
        <ControlLeft
          onClick={(e: ButtonClickEvent) =>
            type === "month" ? setPrevMonth(e) : setPrevYear(e)
          }
          role="button"
        >
          <StyledControlIcon src={backIcon} alt="back arrow icon" />
        </ControlLeft>
        {value}
        <ControlRight
          onClick={(e: ButtonClickEvent) =>
            type === "month" ? setNextMonth(e) : setNextYear(e)
          }
          role="button"
        >
          <StyledControlIcon src={nextIcon} alt="next arrow icon" />
        </ControlRight>
      </StyledControl>
    </>
  );
};

export default Control;
