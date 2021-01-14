import styled, { css } from "styled-components";
export const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 5;
`;

export const StyledModal = styled.div<{
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

export const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  font-size: 1.7rem;
`;

export const StyledIcon = styled.img<{
  color: string;
  isAction?: boolean;
}>`
  padding: 0.8rem;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  width: 1.2rem;
  margin: 0 0.5rem;
  ${(props) =>
    props.isAction &&
    css`
      cursor: pointer;
    `}
`;

export const StyledContent = styled.div`
  padding: 0 1rem;
  margin: 1rem 0;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
