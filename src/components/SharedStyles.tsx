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
