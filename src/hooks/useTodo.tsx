import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Todo {
  description: string;
  done: boolean;
}

export const useTodo = () => {
  const fetchTodos = async () => {
    const { data = [] } = await axios.get("/api/todos");
    return data;
  };

  const query = useQuery(["todos"], () => fetchTodos(), {
    staleTime: 1000,
    refetchInterval: 1000,
  });

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

  return {
    ...query,
    fetchTodos,
    createRandomTodo,
  };
};

export default useTodo;
