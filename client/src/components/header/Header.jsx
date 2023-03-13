import "./header.css";
import {Link} from "react-router-dom";
import {ArrowDown, Friends, FriendsActive, Gaming, Home, HomeActive, Logo, Market, Menu, Messenger, Notifications, Search, Watch} from "../../svg";
import {useSelector} from "react-redux"
import SearchMenu from "./SearchMenu";
import { useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutSide from "../../helpers/OutsideClick";
import { useRef } from "react";
import UserMenu from "./UserMenu";

const Header = ({page,getAllPost,getAllFriends}) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [openAllMenu, setOpenAllMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const user = useSelector(state=>state.Auth.user)

  const allMenuRef = useRef(null)
  useClickOutSide(allMenuRef, ()=>{
    setOpenAllMenu(false)
  })
  const userMenuRef = useRef(null)
  useClickOutSide(userMenuRef, ()=>{
    setOpenUserMenu(false)
  })


  return (
    <header>
      <div className="header_left">
        <div className={showSearchMenu ? "searchHidden" : "searchBlock"}>
        <Link to="/" className="header_logo" onClick={getAllPost}>
          <div className="circle"><Logo/></div>
        </Link>
        <div className="search search1" onClick={()=> setShowSearchMenu(true)}>
          <Search color="#65676b"/>
          <input type="text" placeholder="Search Facebook" className="hide_input"/>
        </div>
        </div>
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} user={user}/>}
      </div>
      <div className="header_middle">
        <Link to="/" className={page === "home" ? "middle_icon active" : "middle_icon hover1"} onClick={getAllPost}>{page==="home" ? (<HomeActive color="#65676b"/>):(<Home color="#65676b"/>)}</Link>

        <Link to="/friends-page" className={page === "friends" ? "middle_icon active" : "middle_icon hover1"} onClick={getAllFriends}>{page==="friends" ? (<FriendsActive color="#65676b"/>):(<Friends color="#65676b"/>)}</Link>

        <Link to="/" className="middle_icon hover1"><Watch color="#65676b"/><div className="middle_notification">9+</div></Link>
        <Link to="/" className="middle_icon hover1"><Market color="#65676b"/></Link>
        
        <Link to="/" className="middle_icon hover1"><Gaming color="#65676b"/></Link>
      </div>
      <div className="header_right">
        <Link to={`/profile/${user.username}`} className={page === "profile" ? "profile_link active_link": "profile_link hover1"}>
          <img src={user?.picture} alt="profilePic" />
          <span>{user?.first_name}</span>
        </Link>
        <div className={ `circle_icon hover1 ${openAllMenu && "active_header"}`} ref={allMenuRef}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}} onClick={()=>setOpenAllMenu(prev=>!prev)}>
          <Menu />
          </div>
          {openAllMenu && <AllMenu/>}
        </div>
        <div className="circle_icon hover1"><Messenger /></div>
        <div className="circle_icon hover1"><Notifications/><div className="right_notification">5</div></div>
        <div className={ `circle_icon hover1 ${openUserMenu && "active_header"}`} ref={userMenuRef}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}} onClick={()=>setOpenUserMenu(prev=>!prev)}>
          <ArrowDown />
          </div>
          {openUserMenu && <UserMenu user={user} setOpenUserMenu={setOpenUserMenu}/>}
        </div>
      </div>
    </header>
  )
}

export default Header;