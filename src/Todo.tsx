import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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
  try {
    const res = await axios.post("http://localhost:8080/todos/", props, {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    alert(error);
  }
}

export async function getTodos() {
  try {
    const res = await axios.get("http://localhost:8080/todos/", {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    alert(error);
  }
}

export async function getTodoById(id: string) {
  try {
    const res = await axios.get(`http://localhost:8080/todos/${id}`, {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    alert(error);
  }
}

export async function updateTodoById(id: string, props: TodoProps) {
  try {
    const res = await axios.put(`http://localhost:8080/todos/${id}`, props, {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    alert(error);
  }
}

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleCreateTodo = async () => {
    await createTodo({ title, content });
    const res = await getTodos();
    setTodos(res?.data.data);
  };

  const handleGetTodos = async () => {
    const res = await getTodos();
    setTodos(res?.data.data);
  };

  const handleGetTodo = async (id: string) => {
    const res = await getTodoById(id);
    return (
      <div>
        <h1>{res?.data.data.title}</h1>
        <p>{res?.data.data.content}</p>
      </div>
    );
  };

  const handleEditTodo = (todo: any) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setContent(todo.content);
  };

  const handleSaveTodo = async () => {
    await updateTodoById(selectedTodo?.id as string, {
      title,
      content,
    });
    setSelectedTodo(null);
    setTitle("");
    setContent("");
    const res = await getTodos();
    setTodos(res?.data.data);
  };

  const handleCancelEdit = () => {
    setSelectedTodo(null);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <div>
        <label>
          Title
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Content
          <input type="text" value={content} onChange={handleContentChange} />
        </label>
        <button onClick={handleCreateTodo}>Create Todo</button>
        <button onClick={handleGetTodos}>Get Todos</button>
      </div>
      <div>
        {todos.map((todo: any) => (
          <div key={todo.id}>
            {selectedTodo?.id === todo.id ? (
              <>
                <label>
                  Title
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </label>
                <label>
                  Content
                  <input
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                  />
                </label>
                <button onClick={handleSaveTodo}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h1>{todo.title}</h1>
                <p>{todo.content}</p>
                <button onClick={handleGetTodo.bind(null, todo.id)}>
                  Get Todo
                </button>
                <button onClick={() => handleEditTodo(todo)}>Edit Todo</button>
              </>
            )}
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
