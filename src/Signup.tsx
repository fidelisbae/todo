import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface SignupProps {
  email: string;
  password: string;
}

export function SignupForm() {
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
    const res = await signup(values);
    if (res && res.status === 200) {
      alert("User created successfully");
    }
    navigate("/");
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
