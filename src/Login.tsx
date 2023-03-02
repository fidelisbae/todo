import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { SignupProps } from "./Signup";

export function LoginForm() {
  const [values, setValues] = useState<SignupProps>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await login(values);
    if (res && res.status === 200) {
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/");
    }
  };

  return (
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
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export function login(values: SignupProps) {
  try {
    const res = axios.post("http://localhost:8080/users/login", values);
    return res;
  } catch (error) {
    alert("Login failed");
  }
}
