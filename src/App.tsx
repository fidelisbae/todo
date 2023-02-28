import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { SignupPage } from "./Signup";
import { LoginPage } from "./Login";
import { TodoPage } from "./Todo";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
