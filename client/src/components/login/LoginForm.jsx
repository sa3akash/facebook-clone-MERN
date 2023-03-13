import Input from '../inputs/Input';
import { useState } from 'react';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import { login } from '../../store/AuthReducer';
import Cookies from 'js-cookie'


const LoginForm = ({setOpenRegister}) => {
    
const [inputs, setInputs] = useState({email: '', password: ''});
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const dispatch = useDispatch() 
const navigate = useNavigate()


const handleInputs = (e) => {
  setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
}

// validation inputs
const loginValidation = Yup.object({
  email: Yup.string().email("Must be a valid email").required("Email address is required"),
  password: Yup.string().min(6).required("Password is required"),
})


const handleLoginSubmit = () => {
  const submitLogin = async () => {
    setLoading(true)
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, inputs)
      setError("")
      const {message, ...other} = data;
      dispatch(login(other))
      Cookies.set("user",JSON.stringify(other),{ expires: 7 })
      navigate("/");
      setLoading(false)
    }catch(err){
      setError(err.response?.data.message)
      setLoading(false)
    }
  }
  submitLogin()
}


  return (
    <div className="login">
    <div className="login_one">
      <img src="./icons/facebook.svg" alt="logo" />
      <span>Facebook helps you connect and share with the people in your life.</span>
    </div>
    <div className="login_two">
      <div className="login_form">
        <Formik
        enableReinitialize
        initialValues={inputs}
        validationSchema={loginValidation}
        onSubmit={handleLoginSubmit}
        onPointerEnter={handleLoginSubmit}
        >
          {
            (formik)=> (
              <Form>
               <Input type="text" name="email" placeholder="Email address or Phone number." onChange={handleInputs}/>
               <Input type="password" name="password" placeholder="Password..." onChange={handleInputs} bottom/>
                  
                  {error && <div className="error_text" style={{marginBottom:"10px"}}>{error}</div>}
                <input disabled={loading} type="submit" className='blu_btn loginbtn' value="Log In"/>
              </Form>
            )
          }
        </Formik>
        <Link to="/forgot" className='forgot_password'>Forgotten password?</Link>
        <div className="line_spliter"></div>
        <button className="blu_btn open_signup" onClick={()=>setOpenRegister(true)}>Create New Account</button>
      </div>
      <div className="create_page">
        <Link to="/"><strong>Create a Page</strong> </Link> <span>for a celebrity, brand or business.</span>
      </div>
    </div>
  </div>
  )
}

export default LoginForm