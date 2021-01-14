import React from "react";
import closeIcon from "../assets/close.svg";

import {
  StyledContainer,
  StyledContent,
  StyledModal,
  StyledIcon,
  StyledHeader,
} from "./SharedStyles";

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
              <StyledIcon alt="close icon" src={closeIcon} onClick={onClose} />
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
          </StyledModal>
        </StyledContainer>
      )}
    </>
  );
};

export default TaskModal;
