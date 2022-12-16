import React, { useEffect, FC, useCallback } from "react";
import { css } from "@emotion/core";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { Flex } from "rebass";
import { Input, PasswordInput, SignInBtn, Title, Label } from "./Login.styles";

const LoginForm: FC<{ setUser: Function }> = ({ setUser }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const {
    mutate: login,
    isSuccess,
    isError,
    data,
  } = useMutation<AxiosResponse>("login");

  const handleSubmit: React.FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      login({ password, username } as never);
      // Submit the username and password to the server
    },
    [password, username, login]
  );

  useEffect(() => {
    if (isSuccess) {
      setUser({ avatar: data?.data.avatar, username: data?.data.username });
    }
  }, [isSuccess, data, setUser]);

  return (
    <div>
      <Title>Trustpair Todo App Login</Title>
      <Flex justifyContent={"center"}>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection={"column"}>
            <Label data-testid={"username-login"}>
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
            </Label>
            <Label data-testid={"password-login"}>
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
            </Label>
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
