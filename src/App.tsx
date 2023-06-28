import { useTodo } from "./hooks/useTodo";

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

const App = () => {
  const { todos, createRandomTodo, isLoading } = useTodo();
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

export default App;
