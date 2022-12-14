import React, { FC, memo } from "react";
import styled from "styled-components";
import { Trash } from "@emotion-icons/bootstrap";
import { useMutation } from "react-query";

export const Wrapper = styled.div<{ p?: string }>(({ p = "16px" }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: p,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
}));

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  maxWidth: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
  cursor: "pointer",
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onSelect: (checked: boolean, id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = memo(
  ({ id, label, checked = false, onSelect }) => {
    const deleteTodo = useMutation("deleteTodo");
    const updateTodo = useMutation("updateTodo");

    return (
      <Wrapper>
        <Wrapper p={"O"}>
          <Checkbox
            type="checkbox"
            data-testid={"checkbox-select"}
            id={id}
            checked={checked}
            onChange={(e) => onSelect(e.target.checked, id)}
          />
          <Label
            data-testid={"label-todo"}
            suppressContentEditableWarning={true}
            contentEditable
            onKeyUp={(e) =>
              e.keyCode === 13 &&

              updateTodo.mutate({
                id,
                label: e.currentTarget.textContent || "empty",
              } as never)
            }
            checked={checked}
          >
            {label}
          </Label>
        </Wrapper>
        {!deleteTodo.isSuccess && (
          <Trash
            style={{ cursor: "pointer" }}
            data-testid={"delete-todo"}
            size={"20px"}
            onClick={() => deleteTodo.mutate(id as never)}
          />
        )}
      </Wrapper>
    );
  }
);
