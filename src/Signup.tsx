import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "./api";
import { Signup } from "./type";

export function SignupPage() {
  const [values, setValues] = useState<Signup>({
    email: "",
    password: "",
  });
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmailValid(/\S+@\S+\.\S+/.test(values.email));
  }, [values.email]);

  useEffect(() => {
    setPasswordValid(values.password.length >= 8);
  }, [values.password]);

  useEffect(() => {
    setFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await signup(values);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful");
      navigate("/todo");
    } catch (error) {
      alert(error);
      navigate("/auth/signup");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          이메일
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        {isEmailValid ? null : <p>Please enter a valid email address</p>}
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        {isPasswordValid ? null : (
          <p>Password must be at least 8 characters long</p>
        )}
        <button type="submit" disabled={!isFormValid}>
          등록
        </button>
      </form>
      <button onClick={() => navigate("/")}>홈으로</button>
    </div>
  );
}
