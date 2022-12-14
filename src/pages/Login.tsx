import React, { useEffect, FC } from "react";
import { css } from "@emotion/core";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import styled from "styled-components";
import { Flex } from "rebass";

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border-color: grey;
  height: 26px;
  max-width: 300px;
  display: block;
`;

export const PasswordInput = styled(Input)`
  &[type="password"] {
  }
`;

const Btn = styled.button`
  background-color: hsla(347, 49%, 46%, 1);
  border: 1px solid hsla(0, 0%, 0%, 0.4);
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 3rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1rem 1.2rem;

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

const SignInBtn = styled(Btn)`
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

const LoginForm: FC<{ setUser: Function }> = ({ setUser }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const {
    mutate: login,
    isSuccess,
    isError,
    data,
  } = useMutation<AxiosResponse>("login");

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    login({ password, username } as never);
    // Submit the username and password to the server
  };

  useEffect(() => {
    if (isSuccess) {
      setUser({ avatar: data?.data.avatar, username: data?.data.username });
    }
  }, [isSuccess, data]);

  return (
    <div>
      <h1>Trustpair Todo App Login</h1>
      <Flex justifyContent={"center"}>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection={"column"}>
            <label data-testid={"username-login"}>
              <span>Username:</span>
              <Input
                data-testid={"input-username"}
                css={css`
                  width: 100%;
                  padding: 10px;
                  border-radius: 5px;
                  border: 1px solid #ccc;
                  font-size: 16px;

                  &:focus {
                    outline: none;
                    border-color: #0070f3;
                  }
                `}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label data-testid={"password-login"}>
              <span>Password:</span>
              <PasswordInput
                data-testid={"input-password"}
                css={css`
                  width: 100%;
                  padding: 10px;
                  border-radius: 5px;
                  border: 1px solid #ccc;
                  font-size: 16px;

                  &:focus {
                    outline: none;
                    border-color: #0070f3;
                  }
                `}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </Flex>
          <Flex justifyContent={"center"} mt={10}>
            <SignInBtn data-testid={"button-send-login"} type="submit">
              Login
            </SignInBtn>
          </Flex>
        </form>
      </Flex>

      {isError && (
        <Flex
          mt={10}
          color="yellow"
          justifyContent={"center"}
          data-testid={"error"}
        >
          wrong credentials
        </Flex>
      )}
    </div>
  );
};

export default LoginForm;
