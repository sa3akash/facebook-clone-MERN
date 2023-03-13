import Header from "../components/header/Header";
import LeftSide from "../components/home/left";
import "./style/Home.css";
import {useDispatch, useSelector} from 'react-redux';
import RightSide from "../components/home/right";
import Stories from "../components/home/stories";
import CreatePost from "../components/createPost";
import { useState } from "react";
import ActivateForm from "../components/home/activateForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { activateStore } from "../store/AuthReducer";

const Avtivate = () => {
  const {user,darkTheme} = useSelector((state) => state.Auth);

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const {token} = useParams()


  useEffect(()=>{
    const activateUser = async () => {
      setLoading(true)
      try{
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/activate`, {token},{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        setSuccess(data.message)
        dispatch(activateStore())
        Cookies.set("user", JSON.stringify({...user, verified: true}));
        setTimeout(()=>{
          setLoading(false)
          navigate("/")
          setSuccess("")
        },3000)
      }catch(err){
        setError(err.response?.data.message)

        setTimeout(()=>{
          setLoading(false)
          navigate("/")
          setError("")
        },3000)
      }
    }
    activateUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 console.log(darkTheme)

  return (
    <div className={darkTheme ? "home_page dark" : "home_page"}>
      <Header />
      <LeftSide user={user}/>

      <div className="home_middle">
        <Stories />
        <CreatePost user={user}/>
      </div>

      <RightSide user={user}/>


      {success && (
        <ActivateForm type="success" header="Account verification successfully" text={success} loading={loading}/>
      )}
      {error && (
        <ActivateForm type="error" header="Account verification failed" text={error} loading={loading}/>
      )}
    </div>
  )
}

export default Avtivate