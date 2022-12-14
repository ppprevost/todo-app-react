import { FC, useState } from "react";
import styled from "styled-components";

const Form = styled.form({
  width: "100%",
});

const Input = styled.input({
  width: "100%",
  border: "none",
  padding: 16,
  outline: "none",
  borderRadius: 3,
  marginBottom: 8,
});

export interface AddInputProps {
  onAdd: (label: string) => void;
}

export const AddInput: FC<AddInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  return (
    <Form
      data-testid={"submit-add"}
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(input);
        setInput("");
      }}
    >
      <Input
        onChange={(e) => setInput(e.target.value)}
        data-testid="add-input"
        value={input}
        placeholder="Add a new todo item here"
      />
    </Form>
  );
};
