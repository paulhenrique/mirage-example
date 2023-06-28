import axios from "axios";
import { useEffect, useState } from "react";

export interface Todo {
  description: string;
  done: boolean;
}

export const useTodo = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data = [] } = await axios.get("/api/todos");
      setTodos(data);
    } catch (err) {
      console.error("Deu ruim", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createRandomTodo = async () => {
    const randomTodo: Todo = {
      description: "Random " + (Math.random() * 100).toFixed(),
      done: false,
    };

    try {
      const response = await axios.post("/api/todos", randomTodo);
      console.log(
        "🚀 ~ file: useTodo.tsx:29 ~ createRandomTodo ~ response:",
        response
      );
      await fetchTodos();
    } catch (err) {
      console.error("Deu ruim novamente", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    fetchTodos,
    createRandomTodo,
    isLoading,
  };
};

export default useTodo;
