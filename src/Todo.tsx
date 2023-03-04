import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodoById,
} from "./api";
import { Todo } from "./type";

export function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [values, setValues] = useState<Todo>({
    title: "",
    content: "",
  });
  const [updateValues, setUpdateValues] = useState<Todo>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodos();
      setTodos(res.data.data);
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateValues({
      ...updateValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTodo = async () => {
    try {
      await createTodo(values);
      setValues({ title: "", content: "" });
      handleGetTodos();
    } catch (error) {
      alert("에러");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoById(id);
      handleGetTodos();
    } catch (error) {
      alert("에러");
    }
  };

  const handleGetTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data.data);
    } catch (error) {
      alert("에러");
    }
  };

  const handleGetTodoById = async (id: string) => {
    try {
      const res = await getTodoById(id);
      setSelectedTodo(res.data.data);
      setUpdateValues({
        title: res.data.data.title,
        content: res.data.data.content,
      });
    } catch (error) {
      alert("에러");
    }
  };

  const handleUpdateTodoById = async (id: string) => {
    try {
      await updateTodoById(id, {
        title: updateValues.title,
        content: updateValues.content,
      });
      setSelectedTodo(null);
      setUpdateValues({
        title: "",
        content: "",
      });
      handleGetTodos();
    } catch (error) {
      alert("에러");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃");
    navigate("/");
  };

  return (
    <div>
      <h1>Todo</h1>
      <div>
        제목
        <input name="title" value={values.title} onChange={handleChange} />
        내용
        <input name="content" value={values.content} onChange={handleChange} />
        <button onClick={handleCreateTodo}>추가</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.content}</p>
          {!selectedTodo && (
            <button onClick={() => handleDeleteTodo(todo.id as string)}>
              삭제
            </button>
          )}
          {!selectedTodo && (
            <button onClick={() => handleGetTodoById(todo.id as string)}>
              수정
            </button>
          )}
          {(selectedTodo?.id as string) === todo.id && (
            <div>
              제목
              <input
                name="title"
                value={updateValues.title}
                onChange={handleUpdateChange}
              />
              내용
              <input
                name="content"
                value={updateValues.content}
                onChange={handleUpdateChange}
              />
              <button
                onClick={() => handleUpdateTodoById(selectedTodo?.id as string)}
              >
                수정
              </button>
              <button onClick={() => setSelectedTodo(null)}>취소</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
