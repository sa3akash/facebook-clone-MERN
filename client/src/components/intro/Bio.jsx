import React from 'react'

const Bio = ({value,handleChange,maxInputValue,setShowBio,updateUser,placeholder,name,rel}) => {
  return (
    <div className='bio_input_wrap'>
      {rel ? (
        <select name={name} onChange={handleChange} value={value}>
          <option>Single</option>
          <option>In a relationship</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>
      ) : (<>
        <textarea placeholder={placeholder} name={name} value={value} maxLength="60" onChange={handleChange} className='textarea_blue detail_input'></textarea>
        <div className="remaining">{maxInputValue} characters remaining</div>
      </>
      )}
        
        <div className="bio_actions">
            <div className="flex_left"><img src='/icons/public.png' alt='' /> <span>Public</span></div>
            <div className="flex_right">
                <button className="gray_btn hover2" onClick={()=>setShowBio(false)}>Cancel</button>
                <button className="blu_btn" onClick={updateUser}>Save</button>
            </div>
        </div>
    </div>
  )
}

export default Bio