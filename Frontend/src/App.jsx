import { Routes, Route } from "react-router-dom";

import Loginuser from "./Pages/LoginUser";
// import SignupPage from "./pages/SignupPage";
import Home from "./Pages/Home";
import LoginCaptain from "./Pages/LoginCaptain";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/user" element={<Loginuser />} />
      <Route path="/login/captain" element={<LoginCaptain />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
