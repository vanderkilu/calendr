import React from "react";
import styled, { css, keyframes } from "styled-components";

const StyledButton = styled.button<{
  color: string | undefined;
  size: number | undefined;
  btnType?: string;
}>`
  position: relative;
  padding: 0.8rem 1.5rem;
  width: ${(props) => props.size || "8rem"};
  height: ${(props) => props.size / 2 || "4rem"};
  background: linear-gradient(to right, #fd9da1, #fcd0dd);
  color: ${(props) => props.color || "#ffffffff"};
  font-size: 1.2rem;
  border: none;
  border-radius: 6px;
  transition: all 0.3s;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  ${(props) =>
    props.btnType === "normal" &&
    css`
      background: linear-gradient(to right, #bdbdbd, #e0e0e0);
    `}
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: all;
    `}
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const StyledLoader = styled.div`
  position: absolute;
  left: 40%;
  top: 40%;
  transform: translate(-40%, -40%);
  border: 1.5px solid #ffffff; /* Light grey */
  border-top: 1.5px solid #fd9da1; /* Blue */
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: ${spin} 0.5s linear infinite;
`;

interface ButtonProps {
  text: string;
  color?: string | undefined;
  size?: number;
  onClick: () => void;
  btnType?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  size,
  onClick,
  isLoading,
  btnType,
  type,
  isDisabled = false,
}) => {
  return (
    <>
      <StyledButton
        color={color}
        size={size}
        onClick={onClick}
        btnType={btnType}
        disabled={isLoading ? true : isDisabled}
        type={type}
      >
        {!isLoading ? text : <StyledLoader />}
      </StyledButton>
    </>
  );
};

export default Button;
