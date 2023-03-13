import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../inputs/Input'
import * as Yup from "yup"
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"

const ChangePassword = ({error, setError, loading, setLoading,email}) => {
    
  const [code, setCode] = useState('')
  const [codeTwo, setCodeTwo] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate();

  const validationCode = Yup.object({
    code: Yup.string().required("Password is required.").min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
    codeTwo: Yup.string().required("Please retype your password.").oneOf([Yup.ref('code'), null],'Passwords must match.'),
  })


  const handleCodeSubmit = async () => {
    setLoading(true)
    try{
     const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updatePassword`,{email,password:code})
      setSuccess(data.message)
      
      setError("")
      setTimeout(()=>{
        setLoading(false)
        navigate('/auth')
      },2000)
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return (
    <div className="forgot_form">
          <div className="forgot_form_header">Change Password</div>
          <div className="forgot_form_text">Pick a strong password.</div>
          <Formik
          initialValues={{code,codeTwo}}
          enableReinitialize
          validationSchema={validationCode}
          onSubmit={handleCodeSubmit}
          >
           {(formik)=>(
             <Form>
                <Input name="code" type="text" placeholder="New Password" onChange={(e)=>setCode(e.target.value)} value={code}/>
                <Input name="codeTwo" type="text" placeholder="Confirm Password" onChange={(e)=>setCodeTwo(e.target.value)} value={codeTwo}/>
                
                {error && <div className="error_text">{error}</div>}
                {success && <div className="success_text">{success}</div>}

                <div className="forgot_btn_wrap">
                  <Link to="/auth" className="gray_btn">Cancel</Link>
                  <button type="submit" disabled={loading} className="blu_btn">Update</button>
                </div>
             </Form>
           )}
          </Formik>
        </div>
  )
}

export default ChangePassword