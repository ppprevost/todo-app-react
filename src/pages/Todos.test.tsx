import { render, waitFor, fireEvent, query } from "../../utils/test-utils";
import { render as renderTest } from "@testing-library/react";
import Todos from "./Todos";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { v4 as uuid } from "uuid";
import { QueryClientProvider } from "react-query";
import mutations from "../services/mutations";

const server = setupServer();

describe("<Todos />", () => {
  beforeAll(() => {
    server.listen();
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "Pierre", avatar: "logo" })
    );
  });
  afterAll(() => {
    localStorage.clear();
  });

  test("Todos page should render", () => {
    const { getByTestId } = render(<Todos />);
    const todosPage = getByTestId("todos-page");
    expect(todosPage).toBeInTheDocument();
  });

  test("todos must be visible", async () => {
    server.use(
      rest.get("/api/todos", (req, res, ctx) => {
        localStorage.setItem(
          "todos",
          JSON.stringify([
            { id: "22", label: "test" },
            { id: "43", label: "another todo" },
          ])
        );
        const items = localStorage.getItem("todos");
        if (items) {
          return res(ctx.status(200), ctx.delay(1000), ctx.body(items));
        }
      })
    );

    const { getByText } = render(<Todos />);
    await waitFor(
      () => {
        expect(getByText("test")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("when all todos are checked it must show 0 todo(s) left", async () => {
    server.use(
      rest.patch("/api/todo", (req, res, ctx) => {
        const items = window.localStorage.getItem("todos");
        if (items) {
          const todos: Todo[] = JSON.parse(items);

          const newTodos = todos.map((todo) =>
            // @ts-ignore
            todo.id === req.body.id ? { ...todo, ...req.body } : todo
          );
          localStorage.setItem("todos", JSON.stringify(newTodos));
          return res(ctx.status(204), ctx.delay(1000));
        }
      })
    );

    const { queryAllByTestId, getByTestId } = renderTest(<Todos />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mutations(query)}>
          {children}
        </QueryClientProvider>
      ),
    });
    if (queryAllByTestId("checkbox-select")) {
      fireEvent.click(queryAllByTestId("checkbox-select")[0]);
      await waitFor(() => {
        expect(getByTestId("todo-left")).toHaveTextContent("1 todo(s) left");
      });
    }
  });

  test("it should add todo", async () => {
    server.use(
      rest.post("/api/todo", (req, res, ctx) => {
        const items = window.localStorage.getItem("todos");
        if (items) {
          const todos = JSON.parse(items);
          const todo = {
            id: uuid(),
            created_at: new Date(),
            // @ts-ignore
            ...req.body,
          };
          todos.push(todo);
          window.localStorage.setItem("todos", JSON.stringify(todos));
          return res(ctx.status(201), ctx.delay(1000), ctx.json(todo));
        }
      })
    );
    const { getByTestId, getByText } = renderTest(<Todos />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mutations(query)}>
          {children}
        </QueryClientProvider>
      ),
    });
    fireEvent.change(getByTestId("add-input"), {
      target: { value: "newTodo" },
    });
    fireEvent.submit(getByTestId("add-input"));
    await waitFor(
      () => {
        expect(getByText("newTodo")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
