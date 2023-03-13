import { useState,useRef } from "react";
import "./style.css"
import EmojiPickerComponent from "./EmojiPicker";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useOutSideClick from "../../helpers/OutsideClick";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader"
import PostError from "./PostError";
import axios from "axios";
import {useDispatch} from "react-redux"
import {add_post} from "../../store/PostReducer"
import {add_profile_post} from "../../store/ProfileReducer"

const CreatePostPopup = ({user,setOpenPost,setShowPrev,showPrev,profilePost}) => {
  const [text,setText] = useState("")
  const [images, setImages] = useState([])
  const [showBG, setShowBG] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const boxRef = useRef(null)

  useOutSideClick(boxRef, () => {
    setOpenPost(false)
    setShowPrev(false)
  })

  const closeOpenPost = () => {
    setOpenPost(false)
    setShowPrev(false)
  }

  const handleSubmitPost = async () => {
      if(showBG){
        setLoading(true)
        const res = await createPost({
          type: null,
          background: showBG,
          text: text,
          images: null,
          user: user.id,
          token: user.token
        })
        setLoading(false)
        if(res.status === 201){
          setShowBG("")
          setText("")
          setError("")
          setOpenPost(false)
          if(profilePost){
            dispatch(add_profile_post(res.data))
          }else{
            dispatch(add_post(res.data))
          }
        }else{
          setError(res)
        }
      }else if(images && images.length){
        setLoading(true)
        // const postImages = images.map(img=>{
        //   return dataURItoBlob(img)
        // })
        try{
          const path = `${user.username}/PostsImages`;
          
          let formData = new FormData()
          formData.append("path", path)
          images.forEach(imag=>formData.append("file", imag))

          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadImages`,formData,{
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization: `bearer ${user.token}`
              }
          })

          if(response.status === 201){
           const res = await createPost({
              type: null,
              background: null,
              text: text,
              images: response.data,
              user: user.id,
              token: user.token
            })
            setLoading(false)
            if(res.status === 201){
            setShowBG("")
            setImages([])
            setText("")
            setError("")
            setOpenPost(false)
            if(profilePost){
              dispatch(add_profile_post(res.data))
            }else{
              dispatch(add_post(res.data))
            }
            }else{
              setError("Something went wrong.")
            }
            
          }else{
            setLoading(false)
            setError("Image not uploaded.")
          }
      }catch(err){
        setLoading(false)
        setError(err.response.data.message);
      }
    
      }else if(text){
        setLoading(true)
        const res = await createPost({
          type: null,
          background: null,
          text: text,
          images: null,
          user: user.id,
          token: user.token
        })
        setLoading(false)
        if(res.status === 201){
          setShowBG("")
          setText("")
          setOpenPost(false)
          if(profilePost){
            dispatch(add_profile_post(res.data))
          }else{
            dispatch(add_post(res.data))
          }
        }else{
          setError(res)
        }
      }else{
        setError("Please fill in the text field first.")
      }
    
  }
  return (
    <div className="blur">
      <div className="post_box" ref={boxRef}>
        {error && <PostError error={error} setError={setError}/>}
        <div className="post_box_header">
          <span>Create Post</span>
          <div className="small_circle" onClick={closeOpenPost}><i className="exit_icon"></i></div>
        </div>
        <div className="box_profile">
            <img src={user?.picture} alt="pic" />
            <div className="box_col">
              <span>{user?.first_name} {user?.last_name}</span>
              <div className="box_privacy">
                <img src="/icons/public.png" alt="privacy" />
                <span>Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
        </div>
        {!showPrev ? (
        <EmojiPickerComponent text={text} setText={setText} user={user} showBG={showBG} setShowBG={setShowBG}/>
        ) :(
        <ImagePreview text={text} setText={setText} user={user} images={images} setImages={setImages} setShowPrev={setShowPrev} setError={setError}/>
        )}

         <AddToYourPost setShowPrev={setShowPrev}/>
         <button className="submit_post" disabled={loading} style={{backgroundColor : loading && "var(--blue-color)"}} onClick={handleSubmitPost}>{loading ? <PulseLoader size={5} color="#fff"/> : "Post"}</button>
      </div>
    </div>
  )
}

export default CreatePostPopup;