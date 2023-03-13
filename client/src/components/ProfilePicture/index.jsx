import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../functions/user";
import useClickOutSide from "../../helpers/OutsideClick";
import { profilePic_update } from "../../store/ProfileReducer";
import "./style.css";
import UpdateProfilePic from "./UpdateProfilePic";

const ProfilePicture = ({setShowProfileSelect,user,setProfilePicture}) => {

    const [imagePic, setImagePic] = useState('')
    const [error, setError] = useState('')

    const {photos} = useSelector(state=>state.Photos)

    const dispatch = useDispatch()

    const inputRef = useRef(null)
    const selectRef = useRef(null)

    useClickOutSide(selectRef, ()=>setShowProfileSelect(false))
    

    const handleChange = (e) => {
      const image = e.target.files[0];
      if(image.type !== 'image/png' && image.type !== 'image/gif' && image.type !== 'image/jpeg' && image.type !== 'image/webp'){
        return setError("file formate not supported")
      }else if(image.size > 1024 * 1024){
        return setError("file is too large! max 1mb allowed")
      }else{
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          setImagePic(reader.result)
          setError("")
        }
      }
    }


    const updateProfileWithPost = async (url) => {
      try{
        const updateProfilePic = await updateProfile({url:url, token: user.token})
        if(updateProfilePic.status === 200) {
          setShowProfileSelect(false)
          setImagePic("")
          setProfilePicture(updateProfilePic.data)
          dispatch(profilePic_update( updateProfilePic.data))
      }
      }catch(err){
        console.log(err)
      }
    }


  return (
    <div className="blur">
         <input type="file" accept="image/*" ref={inputRef} hidden onChange={handleChange}/>

        <div className="post_box picture_select" ref={selectRef}>
           <div className="post_box_header">
            <div className="small_circle" onClick={()=>setShowProfileSelect(false)}><i className="exit_icon"></i></div>
            <span>Update Profile Picture</span>
           </div>

           <div className="update_picture_wrap">
            <div className="update_picture_buttons">
                <button className="light_blue_btn" onClick={()=>inputRef.current.click()}><i className="plus_icon filter_blur"></i><span>Upload Photo</span></button>
                <button className="gray_btn"><i className="frame_icon"></i><span>Add Frame</span></button>
            </div>
           </div>
           <div className="old_picture_wrap">

           <div className='old_cover_card'>
            <div className="profile_card_grid">
                {photos.resources?.length ? (photos.resources?.filter(img=> img.folder === `facebook/${user.username}/ProfilePicture`).slice(0,9).map(image=>(
                    <div className='profile_galary' key={image.asset_id}><img src={image.secure_url} alt="images" onClick={()=>updateProfileWithPost(image?.secure_url)}/></div>
                ))) : (
                <div className='no_posts' style={{justifyContent: "flex-start",width:"250px"}}>No Photo Found.</div>
                )}
            </div>
        </div>
       
           </div>
           {
            imagePic && <UpdateProfilePic setImagePic={setImagePic} imagePic={imagePic} setError={setError} setShowProfileSelect={setShowProfileSelect} setProfilePicture={setProfilePicture}/>
          }

   
          {error && (
            <div className="postError"><span>{error}</span> <button className='blu_btn' onClick={()=>setError('')}>Try again</button></div>
          )}
        </div>   

    </div>
  )
}

export default ProfilePicture;