import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../data/getCroppedImg";
import { createPost } from "../../functions/post";
import { updateCover } from "../../functions/user";
import useClickOutSide from "../../helpers/OutsideClick";
import PulseLoader from "react-spinners/PulseLoader";
import {add_post} from '../../store/PostReducer';
import {add_profile_post} from '../../store/ProfileReducer';
import {useDispatch, useSelector} from "react-redux"
import OldCover from "./OldCover";

const Cover = ({ cover,visitor ,user,SkeletonState}) => {
    const [isOpenShow, setIsOpenShow] = useState(false);
    const [coverPic, setCoverPic] = useState(null)
    const [error, setError] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croptPixel, setCroptPixel] = useState(null)
    const [coverWidth, setCoverWidth] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showOldCover, setShowOldCover] = useState(false)

    const dispatch = useDispatch()
    const {photos} = useSelector(state=>state.Photos)

    const inputRef = useRef(null)
    const cRef = useRef(null)

    const coverRef = useRef(null)
    useClickOutSide(coverRef, ()=> setIsOpenShow(false))

    const handleChange = (e) => {      
      const image = e.target.files[0];
      if(image.type !== 'image/png' && image.type !== 'image/gif' && image.type !== 'image/jpeg' && image.type !== 'image/webp'){
        setIsOpenShow(false)
        return setError("file formate not supported")
      }else if(image.size > 1024 * 1024){
        setIsOpenShow(false)
        return setError("file is too large! max 1mb allowed")
      }else{
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          setCoverPic(reader.result)
          setError("")
        }
      }
    }

    const onCropComplete = useCallback(async(croppedArea, croppedAreaPixels) => {
      // console.log(croppedArea, croppedAreaPixels)
      setCroptPixel(croppedAreaPixels)
    }, [])

    const getCroptImage = useCallback(async(show)=>{
      try{
          let img = await getCroppedImg(coverPic,croptPixel)
          if(show === "show") {
            setCoverPic(img)
          setZoom(1)
          setCrop({ x: 0, y: 0 })
          }else{
              return img;
          }
      }catch(err){
          console.log(err)
      }
    },[coverPic, croptPixel])


    const coverWidthRef = useRef(null)
    useEffect(() => {
      setCoverWidth(coverWidthRef.current.clientWidth)
    }, [coverWidth])


    const updateCoverPicture = async () => {
      
      //dispatch(loading_profile())
      setLoading(true)
      try{
          const img = await getCroptImage()
          const blop = await fetch(img).then(b=>b.blob())
          let path = `${user.username}/CoverPicture`
  
          let formData = new FormData()
          formData.append('file', blop)
          formData.append('path', path)
  
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadImages`,formData,{
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization: `bearer ${user.token}`
              }
          })
          const file = response.data[0]
          
          if(file) {
              // create post
              const newPost = await createPost({
                  type: "cover",
                  background: null,
                  text: null,
                  images: file,
                  user: user.id,
                  token: user.token
                })

                
                // update profile
              const updateProfile = await updateCover({url:file.url, token: user.token})
  
              if(newPost.status === 201 && updateProfile.status === 200) {
                cRef.current.src = file.url
                setCoverPic(null)
                  dispatch(add_post(newPost.data))
                  dispatch(add_profile_post(newPost.data))
                  setLoading(false)
                  setIsOpenShow(false)
                  
              }else{
                  setError(newPost || updateProfile)
                  setLoading(false)
              }
          }
      }catch(err){
          setError(err.response?.data?.message)
          setLoading(false)
      }
    }

  return (
    <div className="profile_cover"  ref={coverWidthRef}>
      <input type="file" ref={inputRef} accept="image/*" hidden onChange={handleChange}/>
    
    {coverPic && 
      <div className="cover_save_changes">
        <div className="cover_change_left"><img src="/icons/public.png" alt="privacy"/>Your cover photo is public</div>
        <div className="cover_change_right">
          <button className="blu_btn opacity_btn" disabled={loading} onClick={()=>setCoverPic("")}>Cancel</button>
          <button className="blu_btn" disabled={loading} onClick={updateCoverPicture}>{loading ? <PulseLoader size={5} color="#fff"/> : "Save Changes"}</button>
        </div>
      </div>}

      {cover && <img src={cover} alt="cover" className="cover_image" ref={cRef}/>}
      <div className="update_cover_wrapper" ref={coverRef}>
       {!visitor && <div className="open_cover_update" onClick={() => setIsOpenShow(!isOpenShow)}>
          <i className="camera_filled_icon"></i>Add Cover Photo
        </div>}
        {isOpenShow && (
          <div className="open_cover_menu">
            <div className="open_cover_menu_item hover1" onClick={()=>{
              setShowOldCover(true)
              setIsOpenShow(false)
            }}>
              <i className="photo_icon"></i>Select Photo
            </div>
            <div className="open_cover_menu_item hover1" onClick={()=>inputRef.current.click()}>
              <i className="upload_icon"></i>Upload Photo
            </div>
          </div>
        )}
      </div>

        {coverPic && <div className="cover_croper">
              <Cropper
                image={coverPic}
                crop={crop}
                zoom={zoom}
                aspect={coverWidth/ 300}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
                maxZoom={3}
                objectFit="horizontal-cover"
              />
          </div>}

          {showOldCover && <OldCover user={user} setShowOldCover={setShowOldCover} photos={photos.resources} coverMainRef={cRef}/>}

       {/* error */}
       {error && (
            <div className="postError" style={{zIndex: "0"}}><span>{error}</span> <button className='blu_btn' onClick={()=>setError('')}>Try again</button></div>
          )}

    </div>
  );
};

export default Cover;
