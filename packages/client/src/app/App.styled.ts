import styled from "styled-components";

export const AppContainerStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const CardContainerStyled = styled.div`
  padding: 10px 15px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`
export const CardBodyStyled = styled.div`
  h1 {
    font-size: 22px;
  }
`;

export const ButtonStyled = styled.div<{type?: string, disabled?: boolean}>`
  font-size: 18px;
  color: white;
  padding: 8px 12px;
  outline: 0;
  border-radius: 8px;
  line-height: 28px;
  background: ${props => props.disabled ? "#6c757d" : props.type === 'primary'
    ? "#007bff" : props.type === 'success'
      ? "#28a745" : props.type === 'danger' ?
        "#dc3545" : "#e0e0e0"};
  width: 120px;
  text-align: center;
  cursor: pointer;
`

export const InputStyled = styled.input`
  outline: 0;
  padding: 10px 8px;
  border-radius: 8px;
  display: block;
  border: 1px solid #b1b1b1;
  margin: 10px 0;
`

export const ErrorContainerStyled = styled.div`
  padding: 8px 12px;
  color: #dc3545;
`;
