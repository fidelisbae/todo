import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate("/auth/signup");
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigate("/todo");
        }}
      >
        Todo
      </button>
    </div>
  );
}
