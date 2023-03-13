import React from 'react'

const SinglePostBackground = ({post}) => {
  return (
    post.background ? (
        <div className='post_bg' style={{backgroundImage: `url(${post.background})`}}>
            <div className="post_bg_text">{post.text}</div>
        </div>
    ): post.type === null ? (
        <>
            <div className={`${!post.images && post.text.length < 100 ? "post_bg_text postBitText" : "post_bg_text"}`}>{post.text}</div>
            {post.images && post.images.length && (
             
                <div className={post.images.length === 1 ?
                    "prevImage1": post.images.length === 2 ? "prevImage2" : post.images.length === 3 ? "prevImage3" : 
                    post.images.length === 4 ? "prevImage4" : post.images.length >= 5 && "prevImage5"}>

                    {post.images.slice(0,5).map((image, index)=>(
                            <img src={image.url} alt="postImage" key={index}/>
                        ))
                    }
                    {post.images.length > 5 && (
                            <div className='more_pices'>+{post.images.length - 5}</div>
                        )
                    }
                </div>
            )}
        </>
    ): post.type === "profilePicture" ? (
        <div className='post_profile_wrap'> 
            <div className="post_updated_bg"><img src={post.user.coverPicture} alt="" /></div>
            <div className="post_updated_pic"><img src={post.images[0].url} alt="" /></div>
        </div>
    ): (
        <div className='post_cover_wrap'> 
           <img src={post.images[0].url} alt="" />
        </div>
    ) 
  )
}

export default SinglePostBackground