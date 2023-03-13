import "./style/Friends.css";
import Header from "../components/header/Header";
import { useEffect } from "react";
import { getFriendsPageInfo } from "../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setLoading } from "../store/FriendPageReducer";
import Card from "../components/friendsPage/Card";
import { Link, useParams } from "react-router-dom";

const FriendsPage = () => {

  const {user,darkTheme} = useSelector((state) => state.Auth);
  const {data} = useSelector(state=>state.FriendsPage)
  const dispatch = useDispatch()

  const {type} = useParams()


  useEffect(() => {
    getAllFriends()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getAllFriends = async () => {
    dispatch(setLoading())
    try{
      const {data} = await getFriendsPageInfo({token:user.token})
      dispatch(setData(data))
    }catch(err){
      console.log(err)
      dispatch(setError(err.response.data.message))
    }
  }
  // className="mmenu_item active_friends"
  return (
    <div className={darkTheme ? "dark" :""}>
      <Header page="friends" getAllFriends={getAllFriends}/>

      <div className="friends">
        <div className="friends_left">
          <div className="friends_header">
            <h3>Friends</h3>
            <div className="small_circle" style={{ marginRight: "0px" }}><i className="settings_filled_icon"></i></div>
          </div>
          <div className="friends_items_wrap">
            <Link to="/friends-page" className={type === undefined ? "mmenu_item active_friends" : "mmenu_item hover3"}>
              <div className="small_circle" style={type===undefined ? { background: "#1876f2" }:{}}>
                <i className={type===undefined ?"friends_home_icon invert":"friends_home_icon"}></i>
                </div>
              <span>Home</span>
              <div className="rArrow"><i className="right_icon"></i></div>
            </Link>

            <Link to="/friends-page/requests" className={type === "requests" ? "mmenu_item active_friends" : "mmenu_item hover3"}>
                <div className="small_circle" style={type==="requests" ? { background: "#1876f2" }:{}}>
                  <i className={type === "requests" ? "friends_requests_icon invert" :"friends_requests_icon"}></i>
                  </div>
                <span>Friends Requests</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </Link>

            <Link to="/friends-page/sent" className={type === "sent" ? "mmenu_item active_friends" : "mmenu_item hover3"}>
                <div className="small_circle" style={type==="sent" ? { background: "#1876f2" }:{}}>
                  <i className={type==="sent" ? "friends_requests_icon invert": "friends_requests_icon"}></i>
                  </div>
                <span>Send Requests</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </Link>
            
            <div className="mmenu_item hover3">
                <div className="small_circle"><i className="friends_suggestions_icon"></i></div>
                <span>Suggestions</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </div>

            <Link to="/friends-page/friends" className={type === "friends" ? "mmenu_item active_friends" : "mmenu_item hover3"}>
                <div className="small_circle" style={type==="friends" ? { background: "#1876f2" }:{}}>
                  <i className={type==="friends" ? "all_friends_icon invert" :"all_friends_icon"}></i>
                  </div>
                <span>All Friends</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </Link>

            <div className="mmenu_item hover3">
                <div className="small_circle"><i className="birthdays_icon"></i></div>
                <span>Birthdays</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </div>

            <div className="mmenu_item hover3">
                <div className="small_circle"><i className="all_friends_icon"></i></div>
                <span>Custom List</span>
                <div className="rArrow"><i className="right_icon"></i></div>
            </div>

          </div>
        </div>


        <div className="friends_right">
         {
          (type===undefined || type === "requests") && (
            <div className="friends_right_wrap">
            <div className="friends_header"><h3>Friends Requests</h3>
            {type === undefined && <Link to="/friends-page/requests" className="see_link hover2">See all</Link>}
            </div>
            <div className="card_wrap">
            {type === undefined && (
                  data.requests && data.requests.slice(0,10).map((user)=>(
                    <Card key={user._id} cardInfo={user} type="requests"/>
                  ))
                )}
                {type === "requests" && (
                  data.requests && data.requests.map((user)=>(
                    <Card key={user._id} cardInfo={user} type="requests"/>
                  ))
                )}
            </div>
          </div>
          )
         }

         {
          (type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
            <div className="friends_header">
              <h3>Send Requests</h3>
              {type === undefined && <Link to="/friends-page/sent" className="see_link hover2">See all</Link>}
              </div>
            <div className="card_wrap">
            {type === undefined && (
                  data.sendRequests && data.sendRequests.slice(0,10).map((user)=>(
                    <Card key={user._id} cardInfo={user} type="sent"/>
                  ))
                )}
                {type === "sent" && (
                  data.sendRequests && data.sendRequests.map((user)=>(
                    <Card key={user._id} cardInfo={user} type="sent"/>
                  ))
                )}
            </div>
          </div>
          )
         }

          {
            (type === undefined || type === "friends") && (
            <div className="friends_right_wrap">
              <div className="friends_header"><h3>All Friends</h3>
              {type === undefined && <Link to="/friends-page/friends" className="see_link hover2">See all</Link>}
              </div>
              <div className="card_wrap">
                {type === undefined && (
                  data.friends && data.friends.slice(0,10).map((user)=>(
                    <Card key={user._id} cardInfo={user} type="friends"/>
                  ))
                )}
                {type === "friends" && (
                  data.friends && data.friends.map((user)=>(
                    <Card key={user._id} cardInfo={user} type="friends"/>
                  ))
                )}
              </div>
          </div>
            )
          }
        </div>
 
      </div>
    </div>
  );
};

export default FriendsPage;
