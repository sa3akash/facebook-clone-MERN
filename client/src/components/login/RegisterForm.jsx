import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RegisterInputs from '../inputs/Registerinputs';
import * as Yup from "yup"
import DateOfBirdSelect from './DateOfBirdSelect';
import GenderSelect from './GenderSelect';
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import {useDispatch} from "react-redux";
import { register } from '../../store/AuthReducer';
import Cookies from 'js-cookie'



const RegisterForm = ({setOpenRegister,el}) => {
    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender:''
    })


    const [dateOfbirthErr, setDateOfbirthErr] = useState('')
    const [genderErr, setGenderErr] = useState('')
    //global
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch() 
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value }))
    }



    const validationRegister = Yup.object({
        first_name: Yup.string().required("What's your name?").min(3,"First name must be between 3-16 characters.").max(16).matches(/^[aA-zZ\s]+$/,"Number and Special character are not allowed"),

        last_name: Yup.string().required("What's your Surname?").min(3,"Surname must be between 3-10 characters.").max(10).matches(/^[aA-zZ\s]+$/,"Number and Special character are not allowed"),

        email: Yup.string().required("You'll need this when you log in and if you ever need to reset your password.").email("Please enter a valid email address"),

        password: Yup.string().required("Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).").min(6, "Password must be atleast 6 characters.")
        .max(36, "Password can't be more than 36 characters"),

    })


    const registerSubmit = async () => {
        setLoading(true)
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, inputs)
            setLoading(false)
            setError("")
            const {message, ...other} = data;
            setSuccess(message)
           
            setTimeout(()=>{
                dispatch(register(other))
                Cookies.set("user",JSON.stringify(other),{ expires: 7 })
                navigate("/");
            },1000)
            
        }catch(err){
            setError(err.response?.data.message)
            setLoading(false)
            setSuccess("")
        }
    }

    const handleSubmit = ()=>{
        
        const current_date = new Date()
        const pic_date = new Date(inputs.bYear,inputs.bMonth - 1,inputs.bDay)
        let atlest14 = new Date(1970 + 14, 0, 1)
        let notThen70 = new Date(1970 + 70, 0, 1)

        if(current_date - pic_date < atlest14){
            setDateOfbirthErr("it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.")
        }else if(current_date - pic_date > notThen70){
            setDateOfbirthErr("it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.")
        }else if(inputs.gender === ""){
            setGenderErr("Please choose a gender. You can change who can see this later.")
            setDateOfbirthErr("");
        }else{
            setGenderErr("");
            setDateOfbirthErr("");
            registerSubmit()
        }
    }


  return (
    <div className='blur'>
        <div className="register" ref={el}>
            <div className="register_header">
                <i className="exit_icon" onClick={()=>setOpenRegister(false)}></i>
                <span>Sign Up</span>
                <span>It's quick and easy.</span>
            </div>
            <Formik initialValues={inputs} enableReinitialize validationSchema={validationRegister} onSubmit={handleSubmit} onPointerEnter={handleSubmit}>
                {()=>(
                    <Form className='register_form'>
                        <div className="register_line">
                        <RegisterInputs type="text" placeholder="First name" name="first_name" onChange={handleInputChange}/>
                        <RegisterInputs type="text" placeholder="Surname" name="last_name" onChange={handleInputChange}/>
                        </div>
                        <div className="register_line">
                        <RegisterInputs type="email" placeholder="Email address" name="email" onChange={handleInputChange}/>
                        </div>
                        <div className="register_line">
                        <RegisterInputs type="password" placeholder="New password" name="password" onChange={handleInputChange}/>
                        </div>
                        <div className="register_column">
                            <div className="register_column_header">
                                Date of birth <i className="info_icon" title='Click for more information'></i>
                            </div>
                            <DateOfBirdSelect handleInputChange={handleInputChange} inputs={inputs} dateOfbirthErr={dateOfbirthErr}/>
                        </div>
                        <div className="register_column">
                            <div className="register_column_header">
                                Gender <i className="info_icon" title='Click for more information'></i>
                            </div>
                        <GenderSelect handleInputChange={handleInputChange} genderErr={genderErr}/>
                        </div>
                        <div className="register_info">
                        By clicking Sign Up, you agree to our <Link to="/">Terms</Link>, <Link to="/">Privacy Policy</Link> and <Link to="/">Cookies Policy</Link>. You may receive SMS notifications from us and can opt out at any time.
                        </div>
                        <div className="register_button_wrapper">
                            <input disabled={loading} className="blu_btn open_signup" type='submit' value="Sign Up"/>
                        </div>
                        <DotLoader color="#1876f2" loading={loading} size="30px"/>
                        {error && <div className="error_text">{error}</div>}
                        {success && <div className="success_text">{success}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default RegisterForm;