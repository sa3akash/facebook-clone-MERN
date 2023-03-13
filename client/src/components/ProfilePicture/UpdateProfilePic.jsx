import axios from 'axios'
import React, { useCallback,useRef,useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch, useSelector } from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'
import getCroppedImg from '../../data/getCroppedImg'
import { createPost } from '../../functions/post'
import { updateProfile } from '../../functions/user'
import { add_post } from '../../store/PostReducer'
import {add_profile_post, profilePic_update} from "../../store/ProfileReducer"


const UpdateProfilePic = ({setImagePic,imagePic,setError,setShowProfileSelect,setProfilePicture}) => {
    const [desc,setDesc] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croptPixel, setCroptPixel] = useState(null)
 
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.Auth)
    const [loading, setLoading] = useState(false)
  const onCropComplete = useCallback(async(croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCroptPixel(croppedAreaPixels)
  }, [])

  const zoomRef = useRef(null)

  const clickZoom = (direction) => {
    if(direction === "d") {
        zoomRef.current.stepDown()
        setZoom(zoomRef.current.value)
    }else if(direction === "i"){
        zoomRef.current.stepUp()
        setZoom(zoomRef.current.value)
    }else{
        setZoom(zoom)
    }
  }

  
  const getCroptImage = useCallback(async(show)=>{
    try{
        let img = await getCroppedImg(imagePic,croptPixel)
        if(show === "show") {
            setImagePic(img)
        setZoom(1)
        setCrop({ x: 0, y: 0 })
        }else{
            return img;
        }
    }catch(err){
        console.log(err)
    }
  },[croptPixel, imagePic, setImagePic])


  const updateProfilePicture = async () => {
    //dispatch(loading_profile())
    setLoading(true)
    try{
        const img = await getCroptImage()
        const blop = await fetch(img).then(b=>b.blob())
        let path = `${user.username}/ProfilePicture`

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
                type: "profilePicture",
                background: null,
                text: desc,
                images: file,
                user: user.id,
                token: user.token
              })
              // update profile
            const updateProfilePic = await updateProfile({url:file.url, token: user.token})

            if(newPost.status === 201 && updateProfilePic.status === 200) {
                setProfilePicture(updateProfilePic.data)
                dispatch(profilePic_update(updateProfilePic.data))
                dispatch(add_profile_post(newPost.data))
                dispatch(add_post(newPost.data))
                setShowProfileSelect(false)
                setImagePic("")
                setLoading(false)
            }else{
                setError(newPost || updateProfilePic)
                setLoading(false)
            }
        }
    }catch(err){
        setError(err.response?.data?.message)
        setLoading(false)
    }
  }


  return (
    <div className="post_box update_image">
           <div className="post_box_header">
            <div className="small_circle" onClick={()=>setImagePic("")}><i className="exit_icon"></i></div>
            <span>Update Profile Picture</span>
           </div>

            <div className="update_image_desc">
                <textarea className='textarea_blue details_input' placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
            </div>

            <div className="update_center">
                <div className="croper">
                    <Cropper
                    image={imagePic}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="round"
                    showGrid={false}
                    maxZoom={3}
                    />
                </div>
            </div>

            <div className="slider">
                <div className="slider_circle hover1" onClick={()=>clickZoom("d")}><i className="minus_icon"></i></div>
                <input type="range" ref={zoomRef} min={1} max={3} step={0.2} value={zoom} onChange={(e)=>setZoom(e.target.value)}/>
                <div className="slider_circle hover1" onClick={()=>clickZoom("i")}><i className="plus_icon"></i></div>
            </div>

            <div className="image_croping_wrap">
                <button className="gray_btn hover2" onClick={()=>getCroptImage("show")}><i className="crop_icon"></i>Crop Photo</button>
                <button className="gray_btn hover2"><i className="temp_icon"></i>Make Temporary</button>
            </div>
            <div className="image_publis_wrap">Your Profile Picture is Public</div>
            <div className="image_submit_wrap">
                <button className="blue_link" onClick={()=>setImagePic("")}><i className="cancel_icon"></i>Cancel</button>
                <button className="blu_btn" disabled={loading} onClick={updateProfilePicture}><i className="public_icon"></i>{loading ? <PulseLoader size={5} color="#fff"/> : "Save"}</button>
            </div>
           
        </div>
  )
}

export default UpdateProfilePic