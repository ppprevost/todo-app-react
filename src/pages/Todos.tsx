import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AddInput } from "../components/AddInput";
import { TodoItem } from "../components/TodoItem";
import { TodoList } from "../components/TodoList";
import { Header } from "../components/Header";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useLocalStorage from "../hooks/useLocaleStorage";
import { sortData, sortOptions } from "../utils";
import { Text } from "rebass";
import { Navigate } from "react-router-dom";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

const Button = styled.button`
  padding: 13px;
  margin-top: 10px;
`;

const getTodos = async () => {
  const response = await axios.get("/api/todos");
  return response.data;
};

function Todos() {
  const [user] = useLocalStorage<User>("user");
  const { data: todos, isSuccess } = useQuery<Todo[]>("todos", getTodos);
  const [sort, setSort] = useState(0);
  const query = useQueryClient();

  useEffect(() => {
    if (todos) {
      const newTodos = sortData(sort, todos);
      query.setQueryData("todos", newTodos);
    }
  }, [sort, todos]);

  const addTodo = useMutation("addTodo");
  const updateTodo = useMutation("updateTodo");

  return (
    <Wrapper data-testid={"todos-page"}>
      {isSuccess && (
        <>
          <Header>
            <img src={user.avatar} alt="avatar" />
            <span>Todo List of {user.username}</span>
          </Header>
          <AddInput
            onAdd={(label) =>
              label &&
              addTodo.mutate({
                label,
                checked: false,
              } as never)
            }
          />
          <TodoList>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onSelect={(checked) =>
                  updateTodo.mutate({ checked, id: todo.id } as never)
                }
              />
            ))}
          </TodoList>

          <footer>
            <Text data-testid={"todo-left"} color={"white"} mt={10}>
              {todos.filter((todo) => !todo.checked).length} todo(s) left
            </Text>

            {todos.length > 1 && (
              <div>
                <Button
                  onClick={() => setSort(sortOptions[sort + 1] ? sort + 1 : 0)}
                >
                  {sortOptions[sort - 1]
                    ? sortOptions[sort - 1] + " order"
                    : sortOptions[sort + 1] + " order"}
                </Button>
              </div>
            )}
          </footer>
        </>
      )}
    </Wrapper>
  );
}

export default Todos;
