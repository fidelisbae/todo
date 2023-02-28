import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignupPage } from "./Signup";
import { Home } from "./Home";
import { LoginPage } from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
