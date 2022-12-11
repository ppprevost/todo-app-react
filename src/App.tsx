import React, { useCallback } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import useLocalStorage from "./hooks/useLocaleStorage";
import initialData from "./assets/initialData.json";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", initialData);
  const addTodo = useCallback((label: string) => {
    setTodos( [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...todos,
    ]);
  }, []);

  const handleSelect = useCallback((checked: boolean, id:string) => {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, checked };
      }
      return todo;
    });
    setTodos(newTodos)
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem {...todo} onSelect={handleSelect} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
