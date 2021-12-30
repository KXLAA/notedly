import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  gap: 2rem;
  background-color: #151515;
  border: solid 2px #181818;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  -webkit-box-shadow: 3px 4px 15px -8px rgba(0, 0, 0, 0.71);
  box-shadow: 3px 4px 15px -8px rgba(0, 0, 0, 0.71);
`;

export const InputContainer = styled.div`
  p {
    font-weight: 400;
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-weight: 400;
  font-size: 1rem;
  color: white;
  background: #181818;
  border-radius: 0.25rem;
  border: none;
  border: 1px solid #313030;
`;

export const Button = styled.button`
  margin-top: 1rem;
  display: inline;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #101010;
  cursor: pointer;
  border: none;
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

export const Message = styled.p`
  text-align: center;
  font-weight: 600;
`;

export const Links = styled.a`
  text-decoration: underline;
  color: #ffd803;
`;
