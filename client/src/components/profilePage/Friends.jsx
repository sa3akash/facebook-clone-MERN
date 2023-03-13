import { Link } from "react-router-dom"

const Friends = ({friends}) => {

  return (
    <div className='profile_card'>
    <div className="profile_card_header">
        <span>Friends</span>
        <span className="profile_header_link">See all friends</span>
    </div>

    <div className="profile_card_count">
        {friends && (
            friends.length === 0 ? (<span>0 Friend</span>) : <span>{friends.length} Friends</span>
        )}
    </div>

    <div className="profile_card_grid">
        {friends && friends.length ? (friends.slice(0,9).map((friend,i)=>(
            <Link to={`/profile/${friend.username}`} className='profile_galary' key={i}> <img src={friend.picture} alt="friend-pic" /><span>{friend.first_name} {friend.last_name}</span></Link>
        ))) : (
        <div className='no_posts' style={{justifyContent: "flex-start",width:"250px"}}>No Friend Found.</div>
        )}
    </div>
   
</div>
  )
}

export default Friends