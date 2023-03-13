import React from 'react'

const FriendSmallCard = ({item}) => {
  return (
    <div className='ppumk_list_item'>
        <div className="add_friend_profile">
            <img src={item.profile_picture} alt="" />
            <div className="add_friend_info">
                <div className="add_friend_name">{item.profile_name.length > 11 ? item.profile_name.substr(0,11)+"..." : item.profile_name}</div>
                <div className="light_blue_btn">
                    <img src="/icons/addFriend.png" className='filter_blur' alt="add" /><span>Add Friend</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendSmallCard