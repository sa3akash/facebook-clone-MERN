import React from 'react'
import { Link } from 'react-router-dom';
import { Dots } from '../../svg';

const ProfileMenu = () => {
  return (
    <div className='profile_menu_wrap'>
        <div className="profile_menu">
        <Link to="/" className='active'>Posts</Link>
        <Link to="/" className='hover1'>About</Link>
        <Link to="/" className='hover1'>Friends</Link>
        <Link to="/" className='hover1'>Photos</Link>
        <Link to="/" className='hover1'>Videos</Link>
        <Link to="/" className='hover1'>Chack-ins</Link>
        <Link to="/" className='hover1'>More</Link>
        <div className="p10_dots_wraper"><div className="p10_dots hover2"><Dots/></div></div>
        </div>
    </div>
  )
}

export default ProfileMenu;