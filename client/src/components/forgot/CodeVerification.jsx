import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../inputs/Input'
import * as Yup from "yup"
import axios from 'axios'
import { useState } from 'react'

const CodeVerification = ({error, setError, loading, setLoading,setResetStep,email}) => {
    
  const [code, setCode] = useState('')

  const validationCode = Yup.object({
    code: Yup.string().required("Code field is required").max(6,"Code must be 6 numbers"),
  })


  const handleCodeSubmit = async () => {
    setLoading(true)
    try{
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/validateCode`,{code,email})
      setLoading(false)
      setError("")
      setResetStep(3)
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return (
    <div className="forgot_form">
          <div className="forgot_form_header">Code Verification</div>
          <div className="forgot_form_text">Enter your code that been send to your email.</div>
          <Formik
          initialValues={{code}}
          enableReinitialize
          validationSchema={validationCode}
          onSubmit={handleCodeSubmit}
          >
           {(formik)=>(
             <Form>
                <Input name="code" type="number" placeholder="Code" onChange={(e)=>setCode(e.target.value)} value={code}/>
                
                {error && <div className="error_text">{error}</div>}

                <div className="forgot_btn_wrap">
                  <Link to="/auth" className="gray_btn">Cancel</Link>
                  <button type="submit" disabled={loading} className="blu_btn">Verify</button>
                </div>
             </Form>
           )}
          </Formik>
        </div>
  )
}

export default CodeVerification