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
          if (localStorage.getItem("token")) {
            console.log("token", localStorage.getItem("token"));
            navigate("/todo");
            return;
          }
          navigate("/auth/login");
        }}
      >
        로그인
      </button>
    </div>
  );
}
