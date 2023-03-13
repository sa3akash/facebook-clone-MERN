import Moment from "react-moment"
import { Link } from "react-router-dom"

const Comment = ({comment}) => {

  return (
    <div className="singleComment">
        <img src={comment.commentBy.picture} alt={comment.commentBy.username} className="SingleProfile_img"/>

        <div className="singleCommentColumn">
            <div className="singleComment_wrap">
                <Link to={`/profile/${comment.commentBy.username}`} className="singleComment_name">{comment.commentBy.first_name+" "+comment.commentBy.last_name}</Link>
                <div className="singleComment_text">{comment.comment}</div>
                </div>
                {comment.image && <img src={comment.image} alt="pic" className="singleComment_image"/>}
                <div className="singleCommentActions">
                    <span>Like</span>
                    <span>Reply</span>
                    <span>{<Moment fromNow interval={30}>{comment.commentAt}</Moment>}</span>
                </div>
           
        </div>
    </div>
  )
}

export default Comment