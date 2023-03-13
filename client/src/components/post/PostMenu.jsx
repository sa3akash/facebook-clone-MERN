import { deletePost, savedPost } from '../../functions/post';
import PostMenuItem from './PostMenuItem';
import { saveAs } from 'file-saver';
import { delete_post } from '../../store/PostReducer';
import {useDispatch} from "react-redux"
import { delete_profile_post } from '../../store/ProfileReducer';

const PostMenu = ({userId, postUserId, isImages,postId,user,setShowMenu,checkPost,setCheckPost,post}) => {  
  
  const dispatch = useDispatch()

  const saveHandler = async () => {
        await savedPost({postId:postId,token:user.token})
        setShowMenu(false)
        setCheckPost(prev=>!prev)
  }


  const downloadImage = () => {
    post.images.map(img=>saveAs(img.url,`sa2-avro-images-${Date.now()}`))
    setShowMenu(false)
  }

  const deleteById = async () => {
      await deletePost({postId:postId,token:user.token})
      dispatch(delete_post(postId))
      setShowMenu(false)
      dispatch(delete_profile_post(postId))
  }


  return (
    <ul className='post_menu'>
        {userId === postUserId && <PostMenuItem icon="pin_icon" title="Pin Post" />}

        {checkPost ? <PostMenuItem icon="save_icon" title="Unsave Post" subtitle="Remove this from your saved items." onClick={saveHandler}/> : <PostMenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items." onClick={saveHandler}/>}

        <div className="line"></div>
        {userId !== postUserId && <PostMenuItem icon="turnOnNotification_icon" title="Turn ON Notificatons"/>}
        {userId === postUserId && <PostMenuItem icon="edit_icon" title="Edit Post" />}
        {isImages && <div onClick={downloadImage}><PostMenuItem icon="download_icon" title="Download" /></div>}
        {isImages && <PostMenuItem icon="fullscreen_icon" title="Enter Fullscreen" />}
        {userId === postUserId && <PostMenuItem img="/icons/lock.png" title="Edit Audience"/>}
        {userId === postUserId && <PostMenuItem icon="turnOffNotifications_icon" title="Turn Off Notificatons"/>}
        {userId === postUserId && <PostMenuItem icon="delete_icon" title="Turn Off Translations"/>}
        {userId === postUserId && <PostMenuItem icon="date_icon" title="Edit Date"/>}
        {userId === postUserId && <PostMenuItem icon="refresh_icon" title="Refresh Share Attachment"/>}
        {userId === postUserId && <PostMenuItem icon="archive_icon" title="Move to Archive"/>}
        {userId === postUserId && <div onClick={deleteById}><PostMenuItem icon="trash_icon" title="Move to Trash" subtitle="Items in trash are deleted after 30 days."/></div>}
        {userId !== postUserId && <div className="line"></div>}
        {userId !== postUserId && <PostMenuItem img="/icons/report.png" title="Report Post" subtitle="I'm concerned about this post."/>}
    </ul>
  )
}

export default PostMenu;