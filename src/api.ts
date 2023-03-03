import axios from "axios";

import { Signup } from "./type";
import { Todo } from "./type";

const API_BASE_URL = "http://localhost:8080";

const getHeaders = () => ({
  headers: {
    authorization: `${localStorage.getItem("token")}`,
  },
});

export function signup(userInfo: Signup) {
  return axios.post(`${API_BASE_URL}/users/create`, userInfo);
}

export function login(userInfo: Signup) {
  return axios.post(`${API_BASE_URL}/users/login`, userInfo);
}

export function getTodos() {
  return axios.get(`${API_BASE_URL}/todos`, getHeaders());
}

export function createTodo(todo: Todo) {
  return axios.post(`${API_BASE_URL}/todos`, todo, getHeaders());
}

export function deleteTodoById(id: string) {
  return axios.delete(`${API_BASE_URL}/todos/${id}`, getHeaders());
}

export function getTodoById(id: string) {
  return axios.get(`${API_BASE_URL}/todos/${id}`, getHeaders());
}

export function updateTodoById(id: string, todo: Todo) {
  return axios.put(`${API_BASE_URL}/todos/${id}`, todo, getHeaders());
}
