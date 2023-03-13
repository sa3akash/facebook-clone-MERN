import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const ShowUser = ({loading,setLoading,info,setResetStep,error,setError}) => {

  const [success, setSuccess] = useState('')

  const handleSendCode = async ()=>{
    setLoading(true)
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/passwordResetCode`,{email: info.email})
      setSuccess(data.message)
      setError("")
      setTimeout(()=>{
        setLoading(false)
        setResetStep(2)
      },2000)
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return (
    <div className="forgot_form">
          <div className="forgot_form_header">Reset Your Password!</div>
          <div className="reset_grid">
            <div className="reset_left">
                <div className="reset_form-text">How to you want to receive the <br /> code to reset your password.</div>
                <label htmlFor="email" className='hover1'>
                    <input type="radio" name="" id="email" checked readOnly/>
                    <div className="label_col">
                        <span>Send code via email</span>
                        <span>{info?.email}</span>
                    </div>
                </label>
            </div>
            <div className="reset_right">
                <img src={info?.picture} alt="pic" />
                <span>{info?.first_name} {info?.last_name}</span>
                <span>Facebook User</span>
            </div>
          </div>

          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}

          <div className="forgot_btn_wrap">
                  <span className="gray_btn" onClick={()=>setResetStep(0)}>Not You?</span>
                  <button type="submit" disabled={loading} className="blu_btn" onClick={handleSendCode}>Continue</button>
            </div>
    </div>
  )
}

export default ShowUser