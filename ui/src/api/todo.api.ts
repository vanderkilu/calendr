import { ITask, Todo } from "../types";

const baseUrl = "http://localhost:8080/v1/api/todos/";

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

type MutateData = {
  method: "POST" | "PUT" | "DELETE";
  body?: string;
};

async function mutate<T>(
  url: string,
  option: MutateData,
  id?: string
): Promise<T> {
  let newUrl = id ? `${url}${id}` : url;
  const response = await fetch(newUrl, option);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchTodos() {
  return await get<ITask[]>(baseUrl);
}

export async function fetchTodo(id: string) {
  return await get<ITask>(`${baseUrl}/${id}`);
}

export async function createTodo(data: Todo) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  } as MutateData;
  return mutate<ITask>(baseUrl, option);
}

export async function updateTodo(id: string, data: Todo) {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  } as MutateData;
  return mutate<{ msg: string }>(baseUrl, option, id);
}

export async function deleteTodo(id: string) {
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  } as MutateData;
  return mutate<{ msg: string }>(baseUrl, option, id);
}
