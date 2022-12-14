import { vi } from "vitest";
import { render, fireEvent, query, waitFor } from "../../utils/test-utils";
import { TodoItem } from "./TodoItem";
import axios from "axios";

describe("<TodoItem / >", () => {
  test("it should correctly display", () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <TodoItem id={"32"} checked={true} label={"test"} onSelect={onSelect} />
    );
    expect(getByTestId("label-todo")).toBeInTheDocument();
    expect(getByTestId("delete-todo")).toBeInTheDocument();
    expect(getByTestId("checkbox-select")).toBeChecked();
  });

  test("on submit it could send the input value", () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <TodoItem id={"32"} checked={false} label={"test"} onSelect={onSelect} />
    );
    fireEvent.click(getByTestId("checkbox-select"));
    expect(onSelect).toHaveBeenCalledWith(true, "32");
  });
  test("it should delete a todo", async () => {
    const onSelect = vi.fn();
    const { queryByTestId } = render(
      <TodoItem id={"32"} checked={false} label={"test"} onSelect={onSelect} />
    );
    query.setMutationDefaults("deleteTodo", {
      mutationFn: (id: string) => Promise.resolve(),
      onMutate: async (variables) => {
        // Return context with the optimistic todo
      },
      onError: (error, variables, context) => {
        query.invalidateQueries("deleteTodo");
      },
      retry: 1,
    });
    const deleteButton = queryByTestId("delete-todo");
    if (deleteButton) {
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(queryByTestId("delete-todo")).toBeNull();
      });
    }
  });
});
