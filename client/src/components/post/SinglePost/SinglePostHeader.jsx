import React, { useRef, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import useClickOutSide from '../../../helpers/OutsideClick';
import { Dots, Public } from '../../../svg';
import PostMenu from '../PostMenu';

const SinglePostHeader = ({post,user,checkPost,setCheckPost}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null)
    useClickOutSide(menuRef, ()=> setShowMenu(false))

  return (
    <div className="post_header">
        <Link to={`/profile/${post.user.username}`} className="post_header_left">
            <img src={post.user.picture} alt={post.user.username} />
            <div className="header_col">
                <div className="post_profile_name">
                    <span>{post.user.first_name} {post.user.last_name}</span>
                    <div className="update_p">
                        {
                            post.type === "profilePicture" && `updated ${post.user.gender === "male" ? "his" : "her"} profile picture.`
                        }
                        {
                            post.type === "cover" && `updated ${post.user.gender === "male" ? "his" : "her"} cover picture.`
                        }
                    </div>
                </div>
                <div className="post_profile_privacy_date">
                    <Moment fromNow interval={30}>{post.createdAt}</Moment> .&nbsp; <Public color="#828387"/>
                </div>
            </div>
        </Link>

        <div className="post_header_right hover1" ref={menuRef}>
            <div style={{display: "grid", placeItems: "center",width:"100%",height:"100%"}} className={showMenu ? "active_Dots" : ""} onClick={()=>setShowMenu(!showMenu)}>
                <Dots color="#828387"/>
            </div>
            {showMenu && <PostMenu userId={user.id} user={user} postUserId={post.user._id} postId={post._id} isImages={post.images?.length} setShowMenu={setShowMenu} checkPost={checkPost} setCheckPost={setCheckPost} post={post}/>}
        </div>
    </div>
  )
}

export default SinglePostHeader