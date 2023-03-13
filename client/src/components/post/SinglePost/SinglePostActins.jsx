import ReactsPopUp from '../ReactsPopUp'

const SinglePostActins = ({checkReact,handleReact,setIsReactPopup,isReactPopup}) => {
  return (
    <div className="post_actions">
    <div className="post_action hover1" onMouseEnter={()=>setTimeout(() => {
        setIsReactPopup(true)
    }, [500])} onMouseLeave={()=>setTimeout(() => {
        setIsReactPopup(false)
    }, [500])} onClick={()=>handleReact(checkReact ? checkReact : "like")}>
        
        {checkReact ? <img src={`/reacts/${checkReact}.svg`} alt='icon' style={{width: "19px"}}/> : <i className="like_icon"></i>}
        <span style={{color:`${checkReact === "like" ? "#4267b2": checkReact === "love" ? "#f63459" : checkReact === "haha" ? "#f7b125" : checkReact === "sad" ? "#f7b125" : checkReact === "wow" ? "#f7b125" : checkReact === "angry" ? "#e4605a" : ""}`}}>{checkReact ? checkReact : "Like"}</span>
        
    </div>
    {isReactPopup && <ReactsPopUp handleReact={handleReact} setIsReactPopup={setIsReactPopup}/>}
    <div className="post_action hover1">
        <i className="comment_icon"></i> <span>Comment</span>
    </div>
    <div className="post_action hover1">
        <i className="share_icon"></i> <span>Share</span>
    </div>
</div>
  )
}

export default SinglePostActins;