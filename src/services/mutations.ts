import axios from "axios";
import { v4 as uuid } from "uuid";
import { QueryClient } from "react-query";
import { query } from "../../utils/test-utils";

const mutations = (queryClient: QueryClient) => {
  queryClient.setMutationDefaults("addTodo", {
    mutationFn: (newTodo) => axios.post("/api/todo", newTodo),
    onMutate: async (variables) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries("todos");
      // Create optimistic todo
      const optimisticTodo = { id: uuid(), ...variables };

      // Add optimistic todo to todos list
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        old ? [...old, optimisticTodo] : variables
      );

      // Return context with the optimistic todo
      return { optimisticTodo };
    },
    onSuccess: (result, variables, context) => {
      // Replace optimistic todo in the todos list with the result
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        old
          ? old.map((todo) =>
              todo.id === context.optimisticTodo.id ? result.data : todo
            )
          : variables
      );
    },
    onError: (error, variables, context) => {
      // Remove optimistic todo from the todos list
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        old
          ? old.filter((todo) => todo.id !== context.optimisticTodo.id)
          : variables
      );
    },
    retry: 1,
  });

  queryClient.setMutationDefaults("updateTodo", {
    mutationFn: (id) => axios.patch("/api/todo", id),
    onMutate: async (variables) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries("todos");
      // Add optimistic todo to todos list
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        old
          ? old.map((todo) =>
              todo.id === variables.id ? { ...todo, ...variables } : todo
            )
          : variables
      );
      // Return context with the optimistic todo
    },
    onSuccess: (result, variables, context) => {
      // Replace optimistic todo in the todos list with the result
      //queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries("deleteTodo");
    },
    retry: 1,
  });

  queryClient.setMutationDefaults("deleteTodo", {
    mutationFn: (id: string) => axios.delete("/api/todo/" + id),
    onMutate: async (variables) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries("todos");
      // Add optimistic todo to todos list
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        old ? old.filter((todo) => todo.id !== variables) : variables
      );
      // Return context with the optimistic todo
    },
    onSuccess: (result, variables, context) => {
      // Replace optimistic todo in the todos list with the result
      //queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries("deleteTodo");
    },
    retry: 1,
  });

  queryClient.setMutationDefaults("login", {
    mutationFn: ({ password, username }) =>
      axios.post("/api/login", { password, username }),

    onError: (error, variables, context) => {
      queryClient.invalidateQueries("login");
    },

  });
  return queryClient;
};


export default mutations