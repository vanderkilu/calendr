import React, { useState } from "react";

import { ITask, Todo } from "../types";
import Button from "./Button";
import moment from "moment";

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
import { updateTodo } from "../api/todo.api";

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface FormProps {
  task: ITask;
  onSave: (task: ITask, type: "SAVE" | "EDIT") => void;
  onClose: () => void;
  width: number;
}

export const TaskEditForm: React.FC<FormProps> = ({
  onSave,
  width,
  onClose,
  task,
}) => {
  const initialState = {
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    priority: task.priority,
  } as Todo;

  const [input, setInput] = useState<Todo>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSave = async () => {
    setIsLoading(true);
    try {
      const updatedTask = {
        ...input,
        dueDate: moment(input.dueDate).format("YYYY-MM-DD"),
        id: task.id,
      };
      await updateTodo(task.id, updatedTask);
      setIsLoading(false);
      onSave(updatedTask, "EDIT");
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEventType) => {
    event.persist();
    const { name, value } = event.target;
    const isPriority = name === "priority";
    setInput((inputs) => ({
      ...inputs,
      [name]: isPriority ? parseInt(value) : value,
    }));
  };

  return (
    <>
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
                  value={input.dueDate}
                  onChange={handleInputChange}
                />
              </StyledInputGroup>
            </StyledForm>
          </StyledContent>
          <StyledFooter>
            <Button
              text="Save"
              size={120}
              onClick={handleOnSave}
              isLoading={isLoading}
            />
          </StyledFooter>
        </StyledModal>
      </StyledContainer>
    </>
  );
};

export default TaskEditForm;
