import React from "react";
import styled from "styled-components";
import closeIcon from "../assets/close.svg";
import deleteIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";
import calendarIcon from "../assets/calendar.svg";
import priorityIcon from "../assets/priority.svg";

import {
  StyledContainer,
  StyledContent,
  StyledModal,
  StyledIcon,
  StyledHeader,
  StyledFooter,
} from "./SharedStyles";
import Button from "./Button";

const H3 = styled.h3`
  font-size: 1.8rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;

const P = styled.p`
  font-size: 1.2rem;
  color: #757575;
`;

const StyledDetail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface TaskPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({ width, onClose }) => {
  return (
    <>
      <StyledContainer>
        <StyledModal width={width}>
          <StyledHeader>
            <StyledIcon
              isAction
              alt="close icon"
              src={deleteIcon}
              onClick={onClose}
              color="#fafafa"
            />
            <StyledIcon
              isAction
              alt="edit icon"
              src={editIcon}
              onClick={onClose}
              color="#fafafa"
            />
            <StyledIcon
              isAction
              alt="close icon"
              src={closeIcon}
              onClick={onClose}
              color="#fccdec"
            />
          </StyledHeader>
          <StyledContent>
            <H3>read more today</H3>
            <StyledDetail>
              <StyledIcon
                color="#fafafa"
                alt="calendar icon"
                src={calendarIcon}
              />
              <P>Due on Monday, january, 11</P>
            </StyledDetail>
            <StyledDetail>
              <StyledIcon
                color="#fafafa"
                alt="calendar icon"
                src={priorityIcon}
              />
              <P>This task has a high priority</P>
            </StyledDetail>
          </StyledContent>
          <StyledFooter>
            <Button
              text="Mark as completed"
              onClick={() => null}
              btnType="normal"
              size={100}
              color="#212121"
            />
          </StyledFooter>
        </StyledModal>
      </StyledContainer>
    </>
  );
};

export default TaskPreview;
