import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "./api";
import { Signup } from "./type";

export function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Signup>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await login(values);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/todo");
    } catch (error) {
      alert(error);
      navigate("/auth/login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate("/")}>홈으로</button>
    </div>
  );
}
