import LoginForm from "../components/login/LoginForm";
import Footer from "../components/login/Footer";
import RegisterForm from "../components/login/RegisterForm";
import "./style/Login.css";
import { useState } from "react";
import useOutSideClick from "../helpers/OutsideClick"
import { useRef } from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const [openRegister, setOpenRegister] = useState(false)
  const {darkTheme} = useSelector((state) => state.Auth);


  const el = useRef(null)
  useOutSideClick(el, () => setOpenRegister(false))

  return (
    <div className={darkTheme? "login_main dark" :"login_main"}>
      <div className="login_wrapper">
        <LoginForm setOpenRegister={setOpenRegister}/>
        {openRegister && <RegisterForm setOpenRegister={setOpenRegister} el={el}/>}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
