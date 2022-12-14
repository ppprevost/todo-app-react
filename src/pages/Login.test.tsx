import { vi } from "vitest";
import { render, fireEvent, query, waitFor } from "../../utils/test-utils";
import LoginForm from "./Login";


describe("<Login />", () => {
  beforeEach(() => {
    query.setMutationDefaults("login", {
      mutationFn: ({ password, username }) =>
        new Promise((res, rej) => {
          if (password === "test-password" && username === "test-user") {
            return res({ data: { username: "test-user", avatar: "logo" } });
          }

          return rej("not good credentialq ");
        }),

      retry: 1,
    });
  });

  test("the setUser function is called when the form is submitted", async () => {
    const setUser = vi.fn();

    const { getByTestId } = render(<LoginForm setUser={setUser} />);

    expect(getByTestId("username-login")).toBeInTheDocument();
    expect(getByTestId("password-login")).toBeInTheDocument();
    expect(getByTestId("button-send-login")).toBeInTheDocument();

    fireEvent.change(getByTestId("input-username"), {
      target: { value: "test-user" },
    });
    fireEvent.change(getByTestId("input-password"), {
      target: { value: "test-password" },
    });

    fireEvent.submit(getByTestId("button-send-login"));
    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith({
        username: "test-user",
        avatar: "logo",
      });
    });
  });
  test("if login are false, the setUserFunction should not be submitted", async () => {
    const setUser = vi.fn();
    const { getByTestId } = render(<LoginForm setUser={setUser} />);
    fireEvent.change(getByTestId("input-username"), {
      target: { value: "error-user" },
    });
    fireEvent.change(getByTestId("input-password"), {
      target: { value: "error-password" },
    });
    fireEvent.submit(getByTestId("button-send-login"));
    await waitFor(
      () => {
        expect(getByTestId("error")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
