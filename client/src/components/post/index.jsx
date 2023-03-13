import {useSelector} from "react-redux"
import SinglePost from './SinglePost';
import "./style.css";

const Post = ({user,setCheckPost}) => {
    
    const {posts} = useSelector(state=>state.Posts)

  return (
    <div className='posts'>
    {posts && posts.map(post=>(
        <SinglePost key={post._id} post={post} user={user} setCheckPost={setCheckPost}/>
    ))}
    </div>
  )
}

export default Post;