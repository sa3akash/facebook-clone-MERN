import { useRef } from 'react'
import EmojiPickerComponent from './EmojiPicker'

const ImagePreview = ({text,setText,user,images,setImages,setShowPrev,setError}) => {

    const imageInputRef = useRef(null)
    const handleImageChange = (e) =>{
        let files = Array.from(e.target.files);
        files.forEach(img=>{
            if(img.type !== "image/jpeg" && img.type !== "image/png" && img.type !== "image/webp" && img.type !== "image/gif"){
                files = files.filter(item => item.name !== img.name)
                return setError("Unsupported format.");
            }else if(img.size > 1024 * 1024){
                files = files.filter(item => item.name !== img.name)
                return setError("File size is too large! max 1mb allowed.");
            }else{
                setImages((prevImage)=>[...prevImage, img])
                // const reader = new FileReader(img);
                // reader.readAsDataURL(img);
                // reader.onloadend = (e) => {
                //     setImages((prevImage)=>[...prevImage, e.target.result])
                // }
            }
            
        })
    }

  return (
    <div className='overflow_a scrollbar'>
        <EmojiPickerComponent text={text} setText={setText} user={user} type2/>

        <div className="add_pics_wrap">
            <input type="file" multiple accept="image/*" hidden ref={imageInputRef} onChange={handleImageChange}/>
            {images && images.length ? (
                <div className="add_pics_inside1 p0">
                    <div className="prev_action">
                        <button><i className="edit_icon"></i>Edit</button>
                        <button onClick={()=>imageInputRef.current.click()}><i className="addPhoto_icon"></i>Add Photo/Video</button>
                    </div>
                    <div className="small_white_circle" onClick={()=>setImages([])}><i className="exit_icon"></i></div>
                   <div className={images.length === 1 ?
                   "prevImage1": images.length === 2 ? "prevImage2" : images.length === 3 ? "prevImage3" : 
                   images.length === 4 ? "prevImage4" : images.length === 5 ? "prevImage5" : images.length % 2 ===0 ?  "prevImage6" : "prevImage6 singular_image"}
                   >
                    {images.map((image, index) => (
                            <img key={index} className="add_pic" src={URL.createObjectURL(image)} alt="postImage" />
                        ))}
                   </div>
                </div>
            ) : (
                <div className="add_pics_inside1">
                    <div className="small_white_circle" onClick={()=>setShowPrev(false)}><i className="exit_icon"></i></div>
                    <div className="add_col" onClick={()=>imageInputRef.current.click()}>
                        <div className="add_circle"><i className="addPhoto_icon"></i></div>
                        <span>Add Photo/Videos</span>
                        <span>or drag and drop</span>
                    </div>
                </div>
            )}
            <div className="add_pics_inside2">
                <div className="add_circle"><i className="phone_icon"></i></div>
                <div className="mobile_text">Add photo from your mobile device.</div>
                <span className="adphone_btn">Add</span>
            </div>
        </div>
    </div>
  )
}

export default ImagePreview