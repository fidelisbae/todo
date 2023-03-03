import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface SignupProps {
  email: string;
  password: string;
}

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmailValid(/\S+@\S+\.\S+/.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValid(password.length >= 8);
  }, [password]);

  useEffect(() => {
    setFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup({
        email,
        password,
      });
      alert("Signup successful");
      navigate("/todo");
    } catch (error) {
      alert(error);
      navigate("/auth/signup");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      {isEmailValid ? null : <p>Please enter a valid email address</p>}
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      {isPasswordValid ? null : (
        <p>Password must be at least 8 characters long</p>
      )}
      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export async function signup(values: SignupProps) {
  const res = await axios.post("http://localhost:8080/users/create", values);
  localStorage.setItem("token", res.data.token);
  return res;
}
