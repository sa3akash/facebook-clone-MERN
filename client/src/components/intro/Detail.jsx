import axios from 'axios'
import React, { useState } from 'react'
import Bio from './Bio'

const Detail = ({value, img, name , placeholder, user, setUserDetails,userDetails,rel}) => {

  const [showInput,setShowInput] = useState(false)
  const [maxInputValue, setMaxInputValue] = useState(value? 60 - value?.length : 60)

  const handleChange = (e) => {
    setUserDetails(prev=>({...prev, [e.target.name] : e.target.value}))
    setMaxInputValue(60 - e.target.value.length)
}

  const updateUser = async () => {
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updateDetails`,{userDetails},{ headers:{ Authorization: `Bearer ${user.token}` } })
        setUserDetails(data)
        setShowInput(false)
    }catch(err){
        console.log(err.response.data.massage);
    }
}
  return (
    <div className='detail_main'>
        <div className="detail_flex">
           {value ? ( !showInput &&
            <div className="info_profile">
                 <img src={`/icons/${img}.png`} alt="" />
                <span>{value}</span>
                <i className="edit_icon" onClick={()=>setShowInput(true)}></i>
            </div>
           ):(
           !showInput && <div className='Detail_no_Value' onClick={()=>setShowInput(true)}>
                <i className="rounded_plus_icon"></i>
                Add {name}
            </div>
           )}
        </div>
        {showInput && <Bio value={value} name={name} placeholder={placeholder} setShowBio={setShowInput} handleChange={handleChange} updateUser={updateUser} maxInputValue={maxInputValue} rel={rel}/>}
    </div>
  )
}

export default Detail