import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { acceptRequest, addFriend, cancelFriend, deleteRequest, follow, unFollow, unFriend } from '../../functions/user';
import useClickOutSide from '../../helpers/OutsideClick';

const FriendShip = ({friendship: friendState, friendId}) => {

    const [friendsMenu, setFriendsMenu] = useState(false)
    const [respondMenu, setRespondMenu] = useState(false)

    const [friendship, setFriendship] = useState(null)

    useEffect(() => {
        setFriendship(friendState)
    }, [friendState])
    

    const clickOutside = useRef(null)
    useClickOutSide(clickOutside, () => {
        setFriendsMenu(false)
        setRespondMenu(false)
    })

    const {user} = useSelector(state=>state.Auth)


    const addFriendHandler = async () => {
        try{
            setFriendship({...friendship,requestSend:true,following:true})
            await addFriend({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

    const cancelFriendHandler = async () => {
        try{
            setFriendship({...friendship,requestReceived:false})
            setRespondMenu(false)
            setFriendsMenu(false)
            await deleteRequest({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }
    const cancelRequest = async () => {
        try{
            setFriendship({...friendship,requestSend:false,following:false})
            setRespondMenu(false)
            setFriendsMenu(false)
            await cancelFriend({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

    const addFollowHandlwer = async () => {
        try{
            setFriendship({...friendship,following:true})
            setRespondMenu(false)
            setFriendsMenu(false)
            await follow({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

    const unFollowHandler = async () => {
        try{
            setFriendship({...friendship,following:false})
            setRespondMenu(false)
            setFriendsMenu(false)
            await unFollow({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

    const accectFriendHandler = async () => {
        try{
            setFriendship({...friendship,requestReceived:false,friends:true,following:true})
            setRespondMenu(false)
            setFriendsMenu(false)
            await acceptRequest({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

    const unFriendHandler = async () => {
        try{
            setFriendship({...friendship,requestReceived:false,friends:false,following:false})
            setRespondMenu(false)
            setFriendsMenu(false)
            await unFriend({id: friendId, token: user?.token})
        }catch(err){
            console.log(err)
        }
    }

  return ( friendship &&
    <div className="profile_right profileEditMenu" ref={clickOutside}>
        {
            friendship.friends ? (
                
                <div className="blu_btn" onClick={()=>setFriendsMenu(!friendsMenu)} >
                    <img src="/icons/friends.png" alt="icon" style={{filter:"invert(100%)"}}/>
                    <span>Friends</span>
                </div> 
            ) : friendship.requestSend ? (
                <div className="blu_btn" onClick={cancelRequest}>
                    <img src="/icons/cancelRequest.png" alt="icon" style={{filter:"invert(100%)"}}/>
                    <span>Cancel Request</span>
                </div>
            ) : friendship.requestReceived ? (
                <div className="gray_btn" onClick={()=>setRespondMenu(!respondMenu)}>
                    <img src="/icons/friends.png" alt="icon" style={{filter:"invert(20%)"}}/>
                    <span>Respond</span>
                </div>
            ) : !friendship.requestSend && !friendship.requestReceived && (
                <div className="blu_btn" onClick={addFriendHandler}>
                    <img src="/icons/plus.png" alt="icon" style={{filter:"invert(100%)"}}/>
                    <span>Add Friend</span>
                </div>
            )
        }
        {
            friendship.following ? (
                <div className="gray_btn hover2" onClick={unFollowHandler}>
                        <img src="/icons/following.png" alt="icon" style={friendship.following ? {filter:"invert(20%)"} : {filter:"invert(100%)"}}/>
                        <span>Following</span>
                    </div>
            ) : (
                <div className="blu_btn" onClick={addFollowHandlwer}>
                    <img src="/icons/follow.png" alt="icon" style={{filter:"invert(100%)"}}/>
                    <span>Follow</span>
                </div>
            )
        }
        <div className={friendship.friends ? "blu_btn" : "gray_btn hover2"}>
            <img src="/icons/message.png" alt="icon" style={friendship.friends ? {filter:"invert(100%)"} : {filter:"invert(20%)"}}/>
          <span>Message</span>
        </div>

        {friendsMenu && <div className='open_cover_menu'>
                <div className="open_cover_menu_item hover1">
                    <img src="/icons/favoritesOutline.png" alt="icon"/>
                    <span>Favorites</span>
                </div>
                <div className="open_cover_menu_item hover1">
                    <img src="/icons/editFriends.png" alt="icon"/>
                    <span>Edit Friends List</span>
                </div>
                {
                    friendship.following ? (
                    <div className="open_cover_menu_item hover1" onClick={unFollowHandler}>
                        <img src="/icons/unfollowOutlined.png" alt="icon"/>
                        <span>Unfollow</span>
                    </div>
                    ) : (
                    <div className="open_cover_menu_item hover1" onClick={addFollowHandlwer}>
                        <img src="/icons/follow.png" alt="icon" style={{filter:"invert(20%)"}}/>
                        <span>Follow</span>
                    </div>
                    )
                }
                <div className="open_cover_menu_item hover1" onClick={unFriendHandler}>
                    <i className="unfriend_outlined_icon"></i>
                    <span>Unfriend</span>
                </div>
            </div>}

        {respondMenu && <div className='open_cover_menu'>
                <div className="open_cover_menu_item hover1" onClick={accectFriendHandler}>
                    <span>Confirm</span>
                </div>
                <div className="open_cover_menu_item hover1" onClick={cancelFriendHandler}>
                    <span>Cancel</span>
                </div>
            </div>}
      </div>
  )
}

export default FriendShip