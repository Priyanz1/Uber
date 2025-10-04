import { Routes, Route } from "react-router-dom";

import Loginuser from "./Pages/LoginUser";
// import SignupPage from "./pages/SignupPage";
import Start from "./Pages/Start";
import LoginCaptain from "./Pages/LoginCaptain";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import RegisterUser from "./Pages/RegisterUser";
import RegisterCaptain from "./Pages/RegisterCaptain";
import UserProtectedWrapper from "./Pages/UserProtectedWrapper";
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/user" element={<Loginuser />} />
      <Route path="/login/captain" element={<LoginCaptain />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Register/user" element= {<RegisterUser />} />
      <Route path="/Register/captain" element={<RegisterCaptain />} />
      <Route path="/Home" element={<UserProtectedWrapper><Home /> </UserProtectedWrapper>} />
    </Routes>
  );
}

export default App;
