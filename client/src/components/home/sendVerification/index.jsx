import { useState } from "react";
import "./style.css";
import axios from "axios";

const SendVerification = ({user}) => {
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

   const sendVerifiLink = async () => {
    setLoading(true)
    try{
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/resendVerification`,{},{
            headers: {
                Authorization: `Bearer ${user.token}`
              }
        })
        setSuccess(data.message)
        setLoading(false)
        setError("")
        setTimeout(()=>{
            setSuccess("")
        },8000)
    }catch(err){
        setLoading(false)
        setError(err.response.data.message)
        setSuccess("")
        setTimeout(()=>{
            setError("")
        },8000)
    }
   }

  return (
    <div className="varificationLink">
        <span>Your account is not verified, verify your account before it gets deleted
        after a month from creating. </span>
        <button onClick={sendVerifiLink} disabled={loading}>Click here to resend verification link.</button>
        {success && (<div className="success_text">{success}</div>)}
        {error && (<div className="error_text">{error}</div>)}
    </div>
  )
}

export default SendVerification