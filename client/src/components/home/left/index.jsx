import { useState } from 'react';
import { Link } from 'react-router-dom';
import { left } from '../../../data/homeData';
import { ArrowDown1 } from '../../../svg';
import LeftLinks from './LeftLinks';
import ShortCut from './ShortCut';
import "./style.css";


const LeftSide = ({user}) => {
    const [showLeft, setShowLeft] = useState(false);
// 

  return (
    <div className='scrollbar left_home'>
        
    <Link to={`/profile/${user.username}`} className="left_link hover2">
        <img src={user?.picture} alt={user?.username} />
        <span>{user?.first_name} {user?.last_name}</span>
    </Link>
    {
        left.slice(0,8).map((item,index)=>(
            <LeftLinks key={index} img={item.img} notification={item.notification} text={item.text}/>
        ))
    }

    {!showLeft && (
            <div className="left_link hover2" onClick={()=>setShowLeft(true)}>
                <div className="small_circle">
                    <ArrowDown1 />
                </div>
                <span>See more</span>
            </div>
        )
    }

    {showLeft && (
            <div className="more_left">
            {
                left.slice(8,left.length).map((item,index)=>(
                    <LeftLinks key={index} img={item.img} notification={item.notification} text={item.text}/>
                ))
            }
            <div className="left_link hover2" onClick={()=>setShowLeft(false)}>
                <div className="small_circle rotate360"><ArrowDown1 /></div>
                    <span>Show less</span>
                </div>
            </div>
        )
    }
    
    <div className="spliter"></div>

    <div className="left_shortcut">
        <div className="shortcut_heading">Your shortcuts</div>
        <div className="shortcut_edit">Edit</div>
    </div>
    <div className="shortcut_list">
        <ShortCut
        link="https://www.youtube.com/"
        img="/images/ytb.png"
        name="My youtube channel"
        />
        <ShortCut
        link="https://www.instagram.com/"
        img="/images/insta.png"
        name="My instagram account"
        />
    </div>
    <div className={`fb_copyright ${showLeft && "relative_copyright"}`}>
        <Link to="/">Privacy </Link> <span>. </span>
        <Link to="/">Terms </Link> <span>. </span>
        <Link to="/">Advertising </Link> <span>. </span>
        <Link to="/">Ad Choices <i className="ad_choices_icon"></i></Link> <span>. </span>
        <Link to="/">Cookies </Link> <span>. </span>
        <Link to="/">More </Link> <span>. </span>
        <p>Meta &copy; {new Date().getFullYear()}</p>
    </div>
</div>
  )
}

export default LeftSide;