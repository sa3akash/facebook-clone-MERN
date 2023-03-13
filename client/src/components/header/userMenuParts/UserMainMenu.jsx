import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {useDispatch} from "react-redux";
import {logout} from "../../../store/AuthReducer";

const UserMainMenu = ({user,setVisible}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        Cookies.remove('user')
        dispatch(logout())
        navigate("/auth")
    }
    
  return (
    <>
        <Link to={`/profile/${user?.username}`} className="mmenu_header hover3">
        <img src={user?.picture} alt="profilePic" />
        <div className="mmenu_col">
            <span>{user?.first_name} {user?.last_name}</span>
            <span>See your profile</span>
        </div>
    </Link>
    <div className="mmenu_spliter"></div>
    <div className="mmenu_main hover3">
        <div className="small_circle">
            <i className="report_filled_icon"></i>
        </div>
        <div className="mmenu_col">
            <div className="mmenu_span1">Give feedback</div>
            <div className="mmenu_span2">help us improve facebook</div>
        </div>
    </div>
    <div className="mmenu_spliter"></div>
    <div className="mmenu_item hover3" onClick={()=>setVisible(1)}>
        <div className="small_circle">
            <i className="settings_filled_icon"></i>
        </div>
        <span>Settings & Privacy</span>
        <div className="rArrow">
            <i className="right_icon"></i>
        </div>
    </div>
    <div className="mmenu_item hover3" onClick={()=>setVisible(2)}>
        <div className="small_circle">
            <i className="help_filled_icon"></i>
        </div>
        <span>Help & Support</span>
        <div className="rArrow">
            <i className="right_icon"></i>
        </div>
    </div>
    <div className="mmenu_item hover3" onClick={()=>setVisible(3)}>
        <div className="small_circle">
            <i className="dark_filled_icon"></i>
        </div>
        <span>Display & Accessibility</span>
        <div className="rArrow">
            <i className="right_icon"></i>
        </div>
    </div>
    <div className="mmenu_item hover3" onClick={handleLogout}>
        <div className="small_circle">
            <i className="logout_filled_icon"></i>
        </div>
        <span>Log Out</span>
    </div>
            </>
  )
}

export default UserMainMenu