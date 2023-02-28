import { useNavigate } from "react-router-dom";

export function TodoPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Todo</h1>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
