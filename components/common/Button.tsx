import styled from 'styled-components';

const ButtonBase = styled.button`
  display: inline;
  padding: 8px 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #101010;
  cursor: pointer;
  border: none;
`;

export const ButtonOne = styled(ButtonBase)`
  font-size: 1.5rem;
  font-weight: 600;
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

export const ButtonTwo = styled(ButtonBase)`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem 2.5rem;
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
