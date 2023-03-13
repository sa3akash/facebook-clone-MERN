import "./style/Reset.css";
import {Link} from"react-router-dom";
import {useSelector} from "react-redux";
import { useState } from "react";
import SearchEmail from "../components/forgot/SearchEmail";
import ShowUser from "../components/forgot/ShowUser";
import CodeVerification from "../components/forgot/CodeVerification";
import Footer from "../components/login/Footer";
import ChangePassword from "../components/forgot/ChangePassword";

const Reset = () => {

  const [resetStep, setResetStep] = useState(0)
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({})


  const {user,darkTheme} = useSelector((state) => state.Auth);

  
  return (
    <div className={darkTheme ? "forgot dark" :"forgot"}>
      <div className="forgot_header">
          <Link to="/"><img src="/icons/facebook.svg" alt="logo" /></Link>
          
          {user ? (
            <Link to="/profile" className="forgotUserWrap">
              <img src={user?.picture} alt="user" />
              <span>{user?.first_name} {user?.last_name}</span>
            </Link>
          ) : (
             <Link to="/auth" className="blu_btn">Login</Link>
          )}
      </div>

      <div className="forgot_email_wrap">
        {resetStep === 0 &&
        <SearchEmail
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        setInfo={setInfo}
        setResetStep={setResetStep}
        />}

        {resetStep === 1 && info &&
        <ShowUser
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        info={info}
        setResetStep={setResetStep}
        />}
        
        {resetStep === 2 &&
        <CodeVerification
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        setResetStep={setResetStep}
        email={info.email}
        />}

        {resetStep === 3 &&
        <ChangePassword
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        email={info.email}
        />}
        
      </div>
          <Footer/>
    </div>
  )
}

export default Reset;