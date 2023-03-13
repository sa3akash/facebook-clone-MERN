import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {all_photos,error_photos,loading_photos} from '../../store/PhotoReducer'

const Photos = ({username,user}) => {

    const dispatch = useDispatch();
    const {photos} = useSelector(state=>state.Photos)
    
   let path=`${username}/*` 
   let sort = "desc"
   let max = 30

    useEffect(() => {
      const getPhotos = async () => {
        dispatch(loading_photos())
        try{
          const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/listImages/`,{path, sort, max},{ headers:{ Authorization: `Bearer ${user.token}`}})
          dispatch(all_photos(data))
        }catch(err){
          dispatch(error_photos(err.response.data.message))
        }
      }
      getPhotos()
    }, [dispatch, max, path, sort, user.token])

  return (
    <div className='profile_card'>
        <div className="profile_card_header">
            <span>Photos</span>
            <span className="profile_header_link">See all photos</span>
        </div>

        <div className="profile_card_count">
            {photos.total_count === 0 ? (<span>0 Photo</span>) : <span>{photos.total_count} Photos</span> }
        </div>

        <div className="profile_card_grid">
            {photos.resources?.length ? (photos.resources?.slice(0,9).map(image=>(
                <div className='profile_galary' key={image.asset_id}><img src={image.secure_url} alt="images"/></div>
            ))) : (
            <div className='no_posts' style={{justifyContent: "flex-start",width:"250px"}}>No Photo Found.</div>
            )}
        </div>
       
    </div>
  )
}

export default Photos;