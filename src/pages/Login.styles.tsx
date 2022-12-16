import styled from "styled-components";

export const Input = styled.input`
  width: 300px;
  border-radius: 5px;
  border-color: grey;
  border-width: 1px;
  max-width: 300px;
  display: block;
  margin-bottom: 10px;
  padding: 15px;
`;

export const Label = styled.label`
  color:white;
  & span {
    margin-bottom: 10px;
  }
`

export const PasswordInput = styled(Input)`
  &[type="password"] {
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 300px;
`;

const Btn = styled.button`
  background-color: hsla(347, 49%, 46%, 1);
  border: 1px solid hsla(0, 0%, 0%, 0.4);
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 2rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 0.6rem 0.9rem;

  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:active {
    background-color: hsla(347, 49%, 26%, 1);
  }

  @media screen and (max-width: 45em) {
    padding: 1rem 1rem;
    font-size: 1.5rem;
    margin: 0.5rem;
  }
`;

export const SignInBtn = styled(Btn)`
  text-decoration: none;
  background-color: hsla(218, 100%, 47%, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
    0 1px 1px rgba(0, 0, 0, 0.05);
  border-bottom-width: 0.5rem;

  &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
  }
`;