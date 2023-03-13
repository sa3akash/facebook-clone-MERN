import React from 'react'
import { useRef } from 'react'
import { updateCover } from '../../functions/user'
import useClickOutSide from '../../helpers/OutsideClick'

const OldCover = ({user,setShowOldCover,photos,coverMainRef}) => {


const oldCoverRef = useRef(null)

useClickOutSide(oldCoverRef, ()=> setShowOldCover(false))

    const updateOldCover = async (url) => {
        try{
            const updateProfileCover = await updateCover({url:url, token: user.token})
            if(updateProfileCover.status === 200) {
                coverMainRef.current.src = updateProfileCover.data
                setShowOldCover(false)
            }
        }catch(err){

        }
    }

  return (
    <div className='blur'>
        <div className="post_box oldCoverBox" ref={oldCoverRef}>
            <div className="post_box_header">
                <div className="small_circle" onClick={()=>setShowOldCover(false)}><i className="exit_icon"></i></div>
                <span>Select Photo</span>
            </div>
            <div className="select_cover_box_links">
                <div className="select_cover_box_link active">Recent Photos</div>
                <div className="select_cover_box_link">Photo Albums</div>
            </div>

        <div className='old_cover_card'>
            <div className="profile_card_grid">
                {photos?.length ? (photos?.filter(img=> img.folder === `facebook/${user.username}/CoverPicture`).slice(0,9).map(image=>(
                    <div className='profile_galary' key={image.asset_id}><img src={image.secure_url} alt="images" onClick={()=>updateOldCover(image.secure_url)}/></div>
                ))) : (
                <div className='no_posts' style={{justifyContent: "flex-start",width:"250px"}}>No Photo Found.</div>
                )}
            </div>
        </div>
        </div>
    </div>
  )
}

export default OldCover;