import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="login_footer">
          <div className="login_footer_wrap">
            <Link to="/">English (UK)</Link>
            <Link to="/">বাংলা</Link>
            <Link to="/">অসমীয়া</Link>
            <Link to="/">हिन्दी</Link>
            <Link to="/">नेपाली</Link>
            <Link to="/">Bahasa Indonesia</Link>
            <Link to="/">العربية</Link>
            <Link to="/">中文(简体)</Link>
            <Link to="/">Bahasa Melayu</Link>
            <Link to="/">Español</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/" className="footer_squire"><i className="plus_icon"></i></Link>

          </div>
          <div className="footer_spliter"></div>
           <div className="login_footer_wrap">
           <Link to="/">Sign Up</Link>
           <Link to="/">Log in</Link>
           <Link to="/">Messenger</Link>
           <Link to="/">Facebook Lite</Link>
           <Link to="/">Watch</Link>
           <Link to="/">Places</Link>
           <Link to="/">Games</Link>
           <Link to="/">Marketplace</Link>
           <Link to="/">Meta Pay</Link>
           <Link to="/">Oculus</Link>
           <Link to="/">Portal</Link>
           <Link to="/">Instagram</Link>
           <Link to="/">Bulletin</Link>
           <Link to="/">Fundraisers</Link>
           <Link to="/">Services</Link>
           <Link to="/">Voting Information Centre</Link>
           <Link to="/">Privacy Policy</Link>
           <Link to="/">Privacy Centre</Link>
           <Link to="/">Groups</Link>
           <Link to="/">About</Link>
           <Link to="/">Create ad</Link>
           <Link to="/">Create Page</Link>
           <Link to="/">Developers</Link>
           <Link to="/">Careers</Link>
           <Link to="/">Cookies</Link>
           <Link to="/">AdChoices <i className="adChoices_icon"></i></Link>
           <Link to="/">Terms</Link>
           <Link to="/">Help</Link>
           <Link to="/">Contact uploading and non-usersSettings</Link>
          </div>
          <div className="login_footer_wrap">
          <Link to="/" style={{fontSize: "12px", margin: "10px 0px",display:"inline-block"}}>Meta &copy; {new Date().getFullYear()}</Link>
          </div>
        </footer>
  )
}

export default Footer