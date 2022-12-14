import { describe, test, vi, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { AddInput } from "./AddInput";


describe("<AddInput / >", () => {
  test("on submit it could send the input value", () => {
    const onAdd = vi.fn();
    const { getByTestId } = render(<AddInput onAdd={onAdd} />);
    fireEvent.change(getByTestId("add-input"), {target: {value: 'test'}});
    fireEvent.submit(getByTestId("add-input"));
    expect(onAdd).toHaveBeenCalledWith("test");
  });
});
