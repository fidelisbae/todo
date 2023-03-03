import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface TodoProps {
  title: string;
  content: string;
}

interface Todo {
  id: string;
  title: string;
  content: string;
}

export function TodoPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Todo</h1>
      <Todos />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          alert("logout");
          navigate("/");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export async function createTodo(props: TodoProps) {
  const res = await axios.post("http://localhost:8080/todos/", props, {
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function deleteTodoById(id: string) {
  const res = await axios.delete(`http://localhost:8080/todos/${id}`, {
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function getTodos() {
  const res = await axios.get("http://localhost:8080/todos/", {
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function getTodoById(id: string) {
  const res = await axios.get(`http://localhost:8080/todos/${id}`, {
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function updateTodoById(id: string, props: TodoProps) {
  const res = await axios.put(`http://localhost:8080/todos/${id}`, props, {
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export function Todos(props: any) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodos();
      setTodos(res.data.data);
    };
    fetchData();
  }, []);

  const handleGetTodos = async () => {
    const res = await getTodos();
    setTodos(res.data.data);
  };

  const handleCreateTodo = async () => {
    await createTodo({
      title,
      content,
    });
    await handleGetTodos();
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodoById(id);
    await handleGetTodos();
  };

  const handleUpdateTodo = async (id: string) => {
    await updateTodoById(id, {
      title: updateTitle,
      content: updateContent,
    });
    setUpdateTitle("");
    setUpdateContent("");
    setSelectedTodo(null);
    await handleGetTodos();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button onClick={handleCreateTodo}>추가</button>
      </div>
      {selectedTodo && (
        <div>
          <input
            type="text"
            placeholder="title"
            value={updateTitle}
            onChange={(e) => {
              setUpdateTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="content"
            value={updateContent}
            onChange={(e) => {
              setUpdateContent(e.target.value);
            }}
          />
          <button onClick={() => handleUpdateTodo(selectedTodo.id)}>
            수정
          </button>
          <button
            onClick={() => {
              setSelectedTodo(null);
              setUpdateTitle("");
              setUpdateContent("");
            }}
          >
            취소
          </button>
        </div>
      )}
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <div>
              <h1>{todo.title}</h1>
              <span>{todo.content}</span>
            </div>
            <div>
              <button
                onClick={() => {
                  setSelectedTodo(todo);
                  setUpdateTitle(todo.title);
                  setUpdateContent(todo.content);
                }}
              >
                수정
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
