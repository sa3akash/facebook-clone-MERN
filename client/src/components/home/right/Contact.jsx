import React from 'react'

const Contact = ({user}) => {
  return (
    <div className='contact hover3'>
        <img className="contact_img" src={user?.picture} alt="contactImg" />
        <span>{user?.first_name} {user?.last_name}</span>
    </div>
  )
}

export default Contact;