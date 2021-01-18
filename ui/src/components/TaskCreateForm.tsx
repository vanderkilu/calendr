import React, { useState } from "react";

import { ITask, TaskCreate } from "../types";
import Button from "./Button";
import moment from "moment";
import { createTodo } from "../api/todo.api";

import closeIcon from "../assets/close.svg";

import {
  StyledContainer,
  StyledModal,
  StyledHeader,
  StyledIcon,
  StyledContent,
  StyledForm,
  StyledInputGroup,
  StyledInput,
  StyledLabel,
  StyledTextArea,
  StyledSelect,
  StyledOption,
  StyledFooter,
} from "./SharedStyles";

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface FormProps {
  onSave: (task: ITask, type: "SAVE" | "EDIT") => void;
  defaultDate: string;
  isOpen: boolean;
  onClose: () => void;
  width: number;
}

export const TaskForm: React.FC<FormProps> = ({
  onSave,
  width,
  onClose,
  isOpen,
  defaultDate,
}) => {
  const initialState = {
    name: "unnamed task",
    description: "",
    status: "inprogress",
    priority: 1,
  } as TaskCreate;

  const [dateStr, setDateStr] = useState(defaultDate);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<TaskCreate>(initialState);

  React.useEffect(() => {
    setDateStr(defaultDate);
  }, [defaultDate]);

  const handleOnSave = async () => {
    setIsLoading(true);
    try {
      const todo = {
        ...input,
        dueDate: moment(dateStr).format("YYYY-MM-DD"),
      };
      const task = await createTodo(todo);
      setIsLoading(false);
      onSave(task, "SAVE");
      setInput(initialState);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEventType) => {
    event.persist();
    setInput((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      {isOpen && (
        <StyledContainer>
          <StyledModal width={width}>
            <StyledHeader>
              <StyledIcon
                alt="close icon"
                src={closeIcon}
                onClick={onClose}
                color="#fccdec"
              />
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
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                  />
                </StyledInputGroup>
              </StyledForm>
            </StyledContent>
            <StyledFooter>
              <Button
                size={120}
                text="Save"
                onClick={handleOnSave}
                isLoading={isLoading}
              />
            </StyledFooter>
          </StyledModal>
        </StyledContainer>
      )}
    </>
  );
};

export default TaskForm;
