import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import FriendShip from "./FriendShip";

const ProfilePicInfos = ({ profile,visitor ,getUsername,user,profilePicture,setProfilePicture}) => {
  const [showProfileSelect, setShowProfileSelect] = useState(false)

  
  return (
    <div className="profile_img_wrap">
      <div className="profilePic_left">
        <div className="profile_w_image">
        <div className="profile_w_bg" style={{ backgroundImage: `url(${profilePicture})`, backgroundSize: "cover"}}></div>
        {!visitor && <div className="profile_circle hover1" onClick={()=>setShowProfileSelect(!showProfileSelect)}>
            <i className="camera_filled_icon"></i>
          </div>}
          
        </div>
        <div className="profile_w_col">
            <div className="profile_name">
                {profile?.first_name} {profile?.last_name}
                <div className="otherName">({getUsername? getUsername : "Othername"})</div>
            </div>
            <div className="profile_friends_count">
              {profile?.friends && (
              profile.friends.length === 0 ? (<span>0 Friend</span>) : <span>{profile.friends.length} Friends</span>
            )} |
              {profile?.friends && (
              profile.followers.length === 0 ? (<span>0 Follower</span>) : <span>{profile.followers.length} Followers</span>
            )}
        </div>
            <div className="profile_friends_images">
            {profile?.friends && (profile.friends.slice(0,6).map((friend,i)=>(
           <Link to={`/profile/${friend.username}`} className="small_p_galary" style={{transform: `translateX(${-i * 10}px)`}} key={i} title={`${friend.first_name} ${friend.last_name}`}> <img src={friend.picture} alt="friend-pic"/></Link>
            )))}
            </div>
        </div>
      </div>
    {
      visitor ? (
        <FriendShip friendship={profile?.friendship} friendId={profile?._id} />
      ) : (
        <div className="profile_right">
        <div className="blu_btn">
          <img src="/icons/plus.png" alt="icon" style={{filter:"invert(100%)"}}/>
          <span>Add to Story</span>
        </div>
        <div className="gray_btn">
          <i className="edit_icon"></i>
          <span>Edit Profile</span>
        </div>
      </div>
      )
    }

    {showProfileSelect && <ProfilePicture setShowProfileSelect={setShowProfileSelect} user={user} setProfilePicture={setProfilePicture}/>}
    
    </div>
  );
};

export default ProfilePicInfos;
