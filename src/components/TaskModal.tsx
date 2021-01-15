import React from "react";

import {
  StyledContainer,
  StyledContent,
  StyledModal,
  StyledIcon,
  StyledHeader,
} from "./SharedStyles";

import closeIcon from "../assets/close.svg";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
}

const TaskModal: React.FC<TaskModalProps> = ({
  children,
  isOpen,
  onClose,
  width,
}) => {
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
            <StyledContent>{children}</StyledContent>
          </StyledModal>
        </StyledContainer>
      )}
    </>
  );
};

export default TaskModal;
