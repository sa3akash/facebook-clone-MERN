import React from 'react'
import {Dots, Feeling, Photo} from "../../svg";

const AddToYourPost = ({setShowPrev}) => {
  return (
    <div className='addto_your_post'>
        <div className="addto_text">Add to your post.</div>
        <div className="post_header_right hover1" onClick={()=>setShowPrev(true)}><Photo color="#45bd62"/></div>
        <div className="post_header_right hover1"><i className="tag_icon"></i></div>
        <div className="post_header_right hover1"><Feeling color="#f7b928"/></div>
        <div className="post_header_right hover1"><i className="maps_icon"></i></div>
        <div className="post_header_right hover1"><i className="microphone_icon"></i></div>
        <div className="post_header_right hover1"><Dots/></div>
    </div>
  )
}

export default AddToYourPost