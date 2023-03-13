import React, { useEffect, useState } from 'react';
import PostComment from './SinglePost/PostComment';
import SinglePostBackground from './SinglePost/SinglePostBackground';
import SinglePostHeader from './SinglePost/SinglePostHeader';
import SinglePostActins from './SinglePost/SinglePostActins';
import millify from "millify";
import Comment from './SinglePost/Comment';
import { getReactById, reactPost } from '../../functions/post';


const SinglePost = ({post,user}) => {
    const [postReact, setPostReact] = useState([])
    const [totalReacts, setTotalReacts] = useState(0)
    const [commentsList,setCommentsList] = useState([])
    const [countComment,setCountComment] = useState(1)
    const [isReactPopup, setIsReactPopup] = useState(false)
    const [checkReact, setCheckReact] = useState("")

    const [checkPost, setCheckPost] = useState(false)

    useEffect(() => {
     setCommentsList(post?.comments)
    }, [post])
    
    useEffect(() => {
        const getReacts = async () => {
            try{
               const {data} = await getReactById({token:user.token, postId: post?._id})
               setPostReact(data.reacts)
               setTotalReacts(data.total)
               setCheckReact(data.check)
               setCheckPost(data.checkPost)
            }catch(err){
                console.log(err)
            }
        }
        getReacts()
      }, [post?._id, user.token])


      
    const handleReact = async (name) => {
        try{
          await reactPost({token:user.token,selectReact:name,postId:post?._id})
          if(checkReact === name){
            setCheckReact("")
            let index = postReact.findIndex((x) => x.react === checkReact);
            if (index !== -1) {
                setPostReact([...postReact, (postReact[index].count = --postReact[index].count)]);
                setTotalReacts((prev) => --prev);
            }
          }else{
            setCheckReact(name)
            let index = postReact.findIndex((x) => x.react === name);
            let index1 = postReact.findIndex((x) => x.react === checkReact);
            if (index !== -1) {
                setPostReact([...postReact, (postReact[index].count = ++postReact[index].count)]);
                setTotalReacts((prev) => ++prev);
            }
            if (index1 !== -1) {
                setPostReact([...postReact, (postReact[index1].count = --postReact[index1].count)]);
                setTotalReacts((prev) => --prev);
            }
          }
          
          setIsReactPopup(false)
        }catch(err){
          console.log(err)
      }
    }

  return (
    <div key={post._id} className="post">
        <SinglePostHeader post={post} user={user} checkPost={checkPost} setCheckPost={setCheckPost}/>
        <SinglePostBackground post={post}/>

        <div className="post_infos">
            <div className="reacts_count">
                <div className="reacts_count_images">{postReact && postReact.sort((a,b)=>b.count - a.count).slice(0,3).map((r,i)=>(
                r.count > 0 && <img src={`/reacts/${r.react}.svg`} alt='' key={i} title={r.count +" "+ r.react}/>
                ))}</div>
                <div className="reacts_count_numbers">{totalReacts > 0 && millify(totalReacts)}</div>
            </div>
            <div className="infos_right">
                <div className="comments_count">{millify(commentsList.length)} comments</div>
                <div className="share_count">{millify(0)} share</div>
            </div>
        </div>

        <SinglePostActins checkReact={checkReact} handleReact={handleReact} setIsReactPopup={setIsReactPopup} isReactPopup={isReactPopup}/>

        <div className="post_comments">
            <div className="comment_order"></div>
            <PostComment user={user} postId={post?._id} setCommentsList={setCommentsList} setCountComment={setCountComment}/>
            {commentsList && commentsList.slice(0,countComment).map((comment,i)=>(
                <Comment comment={comment} key={i}/>
            ))}
            {countComment < commentsList.length && <div className='commentShowMore' onClick={()=>setCountComment(prev=>prev+3)}>View more comment</div>}
        </div>
    
    </div>
  )
}

export default SinglePost