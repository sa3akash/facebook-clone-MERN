import {Formik, Form} from "formik";
import Input from "../inputs/Input"
import {Link} from"react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const SearchEmail = ({error,setError,loading,setLoading,setInfo,setResetStep}) => {

  const [email, setEmail] = useState('')
  
  const validationEmail = Yup.object({
    email: Yup.string().email().required("Email address is required"),
  })

  const handleEmail = async () =>{
    setLoading(true)
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/findUser`,{email: email})
      setInfo(data)
      setLoading(false)
      setError("")
      setResetStep(1)
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return (
    <div className="forgot_form">
          <div className="forgot_form_header">Find Your Account</div>
          <div className="forgot_form_text">Please enter your email address or  mobile <br /> number to search for your account.</div>
          <Formik
          initialValues={{email}}
          enableReinitialize
          validationSchema={validationEmail}
          onSubmit={handleEmail}
          >
           {(formik)=>(
             <Form>
                <Input name="email" type="email" placeholder="Enter your email address." onChange={(e)=>setEmail(e.target.value)} value={email}/>
                
                {error && <div className="error_text">{error}</div>}

                <div className="forgot_btn_wrap">
                  <Link to="/auth" className="gray_btn">Cancel</Link>
                  <button type="submit" disabled={loading} className="blu_btn">Search</button>
                </div>
             </Form>
           )}
          </Formik>
        </div>
  )
}

export default SearchEmail