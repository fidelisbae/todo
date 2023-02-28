import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </button>
    </div>
  );
}
