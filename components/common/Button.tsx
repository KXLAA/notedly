import styled from 'styled-components';

const ButtonBase = styled.button`
  display: inline;
  padding: 10px 20px;
  border-radius: 100px;
  transition: all 0.3s ease;
  color: #101010;
  cursor: pointer;
  border: none;
`;

export const ButtonOne = styled(ButtonBase)`
  font-size: 2rem;
  font-weight: 700;
  background: #ffd803;
  &:hover:not(:disabled),
  &:disabled:not(:disabled),
  &:focus {
    background: #ffeb81;
    transform: translateX(0rem) translateY(-0.125rem);
  }
  &:active:not(:disabled) {
    transform: translateX(0rem) translateY(0.125rem);
  }
  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;
