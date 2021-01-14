import React, { useState } from "react";

import styled, { css } from "styled-components";
import { ITask } from "../types";
import Button from "./Button";

const closeIcon = require("../assets/close.svg");

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 5;
`;

const StyledModal = styled.div<{
  width: number | undefined;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffffff;
  border-radius: 6px;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
  min-height: 20rem;
  padding: 0.5rem 1rem;
  z-index: 6;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}rem;
    `}
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  font-size: 1.7rem;
`;

const StyledIcon = styled.img`
  padding: 0.8rem;
  background-color: #fccdec;
  border-radius: 5px;
  width: 1.2rem;
`;

const StyledContent = styled.div`
  padding: 0 1rem;
  margin: 1rem 0;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledForm = styled.form`
  width: 100%;
`;
export const StyledLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #616161;
  font-weight: 600;
`;
export const StyledInputGroup = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledInput = styled.input`
  padding: 0.8rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  color: #616161;
  font-size: 1.4rem;
  &::placeholder {
    font-size: 1.4rem;
    color: #bdbdbd;
  }
  width: 90%;
`;
export const StyledTextArea = styled.textarea`
  padding: 0.8rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  color: #616161;
  font-size: 1.4rem;
  &::placeholder {
    font-size: 1.4rem;
    color: #bdbdbd;
  }
  width: 90%;
`;
export const StyledSelect = styled.select`
  padding: 0.8rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  background-color: transparent;
  font-size: 1.4rem;
  color: #616161;
  width: 90%;
`;
export const StyledOption = styled.option`
  color: #616161;
  font: inherit;
  font-size: 1.4rem;
`;

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface FormProps {
  onSave: () => void;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  width: number;
}

export const TaskForm: React.FC<FormProps> = ({
  onSave,
  width,
  onClose,
  isOpen,
  onEdit,
}) => {
  const [input, setInput] = useState<Partial<ITask>>({
    name: "",
    description: "",
    dueDate: "",
    status: "inprogress",
    priority: 1,
  });
  const handleInputChange = (event: ChangeEventType) => {
    event.persist();
    setInput((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const handleOnSave = () => {
    console.log("data", input);
  };
  return (
    <>
      <StyledContainer>
        <StyledModal width={width}>
          <StyledHeader>
            <StyledIcon alt="close icon" src={closeIcon} onClick={onClose} />
          </StyledHeader>
          <StyledContent>
            <StyledForm>
              <StyledInputGroup>
                <StyledLabel>Name</StyledLabel>
                <StyledInput
                  autoFocus
                  placeholder="enter task name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </StyledInputGroup>
              <StyledInputGroup>
                <StyledLabel>Description</StyledLabel>
                <StyledTextArea
                  placeholder="enter description"
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                />
              </StyledInputGroup>
              <StyledInputGroup>
                <StyledLabel>Status</StyledLabel>
                <StyledSelect
                  name="status"
                  value={input.status}
                  onChange={handleInputChange}
                >
                  <StyledOption value="in-progress">In Progress</StyledOption>
                  <StyledOption value="completed">Completed</StyledOption>
                </StyledSelect>
              </StyledInputGroup>
              <StyledInputGroup>
                <StyledLabel>Priority</StyledLabel>
                <StyledSelect
                  name="priority"
                  value={input.priority}
                  onChange={handleInputChange}
                >
                  <StyledOption value="1">High</StyledOption>
                  <StyledOption value="2">Medium</StyledOption>
                  <StyledOption value="3">Low</StyledOption>
                </StyledSelect>
              </StyledInputGroup>
              <StyledInputGroup>
                <StyledLabel>Due date </StyledLabel>
                <StyledInput
                  name="dueDate"
                  type="date"
                  value={input.dueDate}
                  onChange={handleInputChange}
                />
              </StyledInputGroup>
            </StyledForm>
          </StyledContent>
          <StyledFooter>
            <Button text="Save" onClick={handleOnSave} />
          </StyledFooter>
        </StyledModal>
      </StyledContainer>
    </>
  );
};

export default TaskForm;
