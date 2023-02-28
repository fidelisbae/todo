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
    const res = await signup({ email, password });
    if (res && res.status === 200) {
      alert("User created successfully");
    }
    navigate("/");
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
  try {
    const res = await axios.post("http://localhost:8080/users/create", values);
    return res;
  } catch (error) {
    alert(error);
  }
}
