import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTodo } from "./hooks/useTodo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createServer } from "miragejs";

const server = createServer({});

server.db;

server.db.loadData({
  todos: [
    {
      description: "Comprar Leite",
      done: false,
    },
  ],
});

server.get("/api/todos", () => server.db.todos, {
  timing: 2000,
});

server.post("/api/todos", (schema, request) => {
  console.log(schema, request);
  schema.db.todos.insert(JSON.parse(request.requestBody));
  return [];
});

const Todos = () => {
  const { data: todos, createRandomTodo, isLoading } = useTodo();
  return (
    <div>
      {isLoading && "Loading..."}
      {!isLoading && (
        <div>
          <pre>{JSON.stringify(todos, null, 2)}</pre>
          <button onClick={createRandomTodo}>Create random Todo</button>
        </div>
      )}
    </div>
  );
};

const Example = () => {
  const { data: todos } = useTodo();

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
};

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Todos />
      <Example />
    </QueryClientProvider>
  );
};

export default App;
