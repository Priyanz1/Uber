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
import CaptainHome from "./Pages/CaptainHome";
import CaptainProtectedWrapper from "./Pages/CaptainProtectedWrapper";
import UserLogout from "./Pages/UserLogout";
import CaptainLogout from "./Pages/CaptainLogout";
import CaptainRiding from "./Pages/CaptainRiding"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/login" element={<Loginuser />} />
      <Route path="/captain/login" element={<LoginCaptain />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/users/Register" element={<RegisterUser />} />
      <Route path="/captain/Register" element={<RegisterCaptain />} />
      <Route
        path="/home"
        element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }
      />
      <Route
        path="/captainhome"
        element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }
      />
      <Route
        path="/captain/riding"
        element={
          <CaptainProtectedWrapper>
            <CaptainRiding />
          </CaptainProtectedWrapper>
        }
      />
      <Route
        path="/users/logout"
        element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }
      />
      <Route
        path="/captain/logout"
        element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        }
      />
    </Routes>
  );
}

export default App;
