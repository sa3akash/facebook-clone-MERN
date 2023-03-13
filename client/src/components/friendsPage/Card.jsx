import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { acceptRequest, cancelFriend, deleteRequest, unFriend } from "../../functions/user";
import { addFriends, filterFriend, filterFriendRequent, filterSend } from "../../store/FriendPageReducer";

const Card = ({ cardInfo,type }) => {

    const {user} = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    const friendControl = async (type,info) => {
        if(type === "accept"){
            await acceptRequest({id:info._id,token:user.token})
            dispatch(filterFriendRequent(info._id))
            dispatch(addFriends(info))
        }
        if(type === "delete"){
            await deleteRequest({id:info._id,token:user.token})
            dispatch(filterFriendRequent(info._id))
        }
        if(type === "sent"){
            await cancelFriend({id:info._id,token:user.token})
            dispatch(filterSend(info._id))
        }
        if(type === "unfriend"){
            await unFriend({id:info._id,token:user.token})
            dispatch(filterFriend(info._id))
        }
    }

  return (
    <div className="f_card">
    <Link to={`/profile/${cardInfo.username}`}>
        <img src={cardInfo.picture} alt={cardInfo.username}/>
        <span>{cardInfo.first_name+" "+cardInfo.last_name}</span>
    </Link>
    {
        type === "requests" ? (<>
            <button className="blu_btn" onClick={()=>friendControl("accept",cardInfo)}>Confirm</button>
            <button className="gray_btn" onClick={()=>friendControl("delete",cardInfo)}>Delete</button>
        </>): type === "sent" ? ( 
        <button className="blu_btn" onClick={()=>friendControl("sent",cardInfo)}>Cancel Request</button>
        ):(<button className="blu_btn" onClick={()=>friendControl("unfriend",cardInfo)}>Unfriend</button>)
    }
  </div>
  );
};

export default Card;
