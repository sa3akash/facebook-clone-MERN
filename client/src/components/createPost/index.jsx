import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";

const CreatePost = ({user,setOpenPost,setShowPrev, profile}) => {

    const handlePhotoOpen = () =>{
        setOpenPost(true);
        setShowPrev(true)
    }
  return (
    <div className="create_post">
        <div className="create_post_header">
            <img src={user?.picture} alt="user-pic" />
            <div className="open_post hover3" onClick={()=>setOpenPost(true)}>What's on your mind, &nbsp;<span>{user?.first_name}</span></div>
        </div>
        <div className="create_splitter"></div>
        <div className="create_post_body">
            <div className="create_post_icon hover1">
                <LiveVideo color="#f3425f"/>
                <span>Live Video</span>
            </div>
            <div className="create_post_icon hover1" onClick={handlePhotoOpen}>
                <Photo color="#4bbf67"/>
                <span>Photo/Video</span>
            </div>
            {profile ? (
                <div className="create_post_icon hover1">
                <i className="lifeEvent_icon"></i>
                <span>Life Event</span>
            </div>
            ):(
                <div className="create_post_icon hover1">
                <Feeling color="#f7b928"/>
                <span>Feeling/Activity</span>
            </div>
            )}
            
        </div>
    </div>
  )
}

export default CreatePost;