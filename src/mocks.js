import { setupWorker, rest } from "msw";
import { v4 as uuid } from "uuid";

const worker = setupWorker(
  rest.post("/api/login", (req, res, ctx) => {
    if (
      req.body.username === "trustpair" &&
      req.body.password === "trustpair@test"
    ) {
      const gender = ["men", "women"];
      const getImage = `https://randomuser.me/api/portraits/${
        gender[Math.floor(Math.random() + 1)]
      }/${Math.floor((Math.random() + 1) * 10)}.jpg`;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({ username: req.body.username, avatar: getImage })
      );
    }
    return res(ctx.status(401));
  }),
  rest.get("/api/todos", (req, res, ctx) => {
    const items = window.localStorage.getItem("todos");
    if (items) {
      return res(ctx.status(200), ctx.delay(1000), ctx.body(items));
    }
    window.localStorage.setItem("todos", "[]");
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.body(window.localStorage.getItem("todos"))
    );
  }),
  rest.post("/api/todo", (req, res, ctx) => {
    const items = window.localStorage.getItem("todos");
    const todos = JSON.parse(items);
    const todo = {
      id: uuid(),
      created_at: new Date(),
      ...req.body,
    };
    todos.push(todo);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    return res(ctx.status(201), ctx.delay(1000), ctx.json(todo));
  }),
  rest.delete("/api/todo/:id", (req, res, ctx) => {
    const items = window.localStorage.getItem("todos");
    const todos = JSON.parse(items);
    const newTodos = todos.filter((todo) => todo.id !== req.params.id);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
    return res(ctx.status(204), ctx.delay(1000));
  }),
  rest.patch("/api/todo", (req, res, ctx) => {
    const items = window.localStorage.getItem("todos");
    const todos = JSON.parse(items);
    const newTodos = todos.map((todo) =>
      todo.id === req.body.id ? { ...todo, ...req.body } : todo
    );
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return res(ctx.status(204), ctx.delay(1000));
  })
);

worker.start();
