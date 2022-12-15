import { render, waitFor } from "../utils/test-utils";
import App from "./App";

describe("<App />", () => {
  test("renders login page when user is not authenticated", async () => {
    // Render the App component
    const { getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText("Login")).toBeInTheDocument();
    });
  });

  test("renders todos page when user is authenticated", async () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test User" }));
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId("todos-page")).toBeInTheDocument();
    }, {timeout:4000});
  });
});
