import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { comment } from '../../../functions/post'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import useClickOutSide from "../../../helpers/OutsideClick"

const PostComment = ({user,postId,setCommentsList,setCountComment}) => {
  const [picker, setPicker] = useState(false)
  const [error, setError] = useState('')
  const [cursorPosition, setCursorPosition] = useState(null);
  const [commentText, setCommentText] = useState('')
  const [commentImage, setCommentImage] = useState(null)
  const [loading,setLoading] = useState(false)


  const imgCommentRef = useRef(null);
  const handleImgChange = (e)=> {
    const image = e.target.files[0];
    if(image.type !== 'image/png' && image.type !== 'image/gif' && image.type !== 'image/jpeg' && image.type !== 'image/webp'){
      return setError("file formate not supported")
    }else if(image.size > 1024 * 1024){
      return setError("file is too large! max 1mb allowed")
    }else{
      setCommentImage(image);
    }
  }
  // emoji picker
  const textRef = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition, textRef]);

  const handleEmojiClick = ({ emoji }) => {
    const refrence = textRef.current;
    refrence.focus();
    const start = commentText.substring(0, refrence.selectionStart);
    const end = commentText.substring(refrence.selectionStart);
    const newText = start + emoji + end;
    setCommentText(newText);
    setCursorPosition(start.length + emoji.length);
  };
// emoji picker end


  const handleComment = async (e) => {

    if(e.key === "Enter"){
      if(!commentText && !commentImage) return setError("Please write a comment")
      setLoading(true)
      try{
        if(commentImage){
          const path = `${user.username}/PostsImages/${postId}/CommentImages`;
          let formData = new FormData()
          formData.append("path", path)
          formData.append("file", commentImage)

          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadImages`,formData,{
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization: `bearer ${user.token}`
              }
          })
          if(response.status === 201){
            let commentImg = response.data[0].url
            const data = await comment({message:commentText,postId:postId,image:commentImg,token:user.token})
            setCommentImage(null)
            setCommentText("")
            setCommentsList(data)
            setCountComment(prev=>prev+1)
            setLoading(false)
          }else{
            setLoading(false)
            setError("Somthing went wrong!")
          }
        }else{
          const data = await comment({message:commentText,postId:postId,image:null,token:user.token})
          setCommentText("")
          setCommentsList(data)
          setCountComment(prev=>prev+1)
          setLoading(false)
        }
      }catch(err){
        setLoading(false)
        return setError("Somthing went wrong")
      }
    }
  }

  const emJi = useRef()
  useClickOutSide(emJi,()=>setPicker(false))

  return (
    <div className='postCommentWrap'>
        <div className="create_comment">
            <img src={user?.picture} alt="pic" />
            <div className="comment_input_wrap">
              
              <input type="file" hidden ref={imgCommentRef} accept="image/*" onChange={handleImgChange}/>
              {error && (
                  <div className="postError"><span>{error}</span> <button className='blu_btn' onClick={()=>setError('')}>Try again</button></div>
              )}
             
              <input type="text" ref={textRef} value={commentText} placeholder="Write a comment" onChange={(e)=>setCommentText(e.target.value)} onKeyUp={handleComment}/>
              <div className="comment_circle" style={{marginTop:"5px"}}><ClipLoader size={20} color="#1876f2" loading={loading}/></div>
              <div ref={emJi} className="comment_circle_icon hover2">
                <div className="comment_circle_icon2" onClick={()=>setPicker(!picker)}><i className="emoji_icon"></i></div>
                {picker && <div className="comment_emoji_picker" >
                  <EmojiPicker onEmojiClick={handleEmojiClick} height="250px" width="250px" searchDisabled />
                </div> }
              </div>
              <div className="comment_circle_icon hover2" onClick={()=>imgCommentRef.current.click()}><i className="camera_icon"></i></div>
              <div className="comment_circle_icon hover2"><i className="gif_icon"></i></div>
              <div className="comment_circle_icon hover2"><i className="sticker_icon"></i></div>
            </div>
        </div>
        {commentImage && (
          <div className="comment_image_preview">
            <img src={URL.createObjectURL(commentImage)} alt='commentImg'/>
            <div className="small_white_circle" onClick={()=>setCommentImage(null)}><i className="exit_icon"></i></div>
          </div>
        ) }
    </div>
  )
}

export default PostComment;