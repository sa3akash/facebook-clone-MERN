import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const EmojiPickerComponent = ({ text, setText, user,type2,showBG ,setShowBG}) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);


  const background = [
    "/images/postBackgrounds/1.jpg",
    "/images/postBackgrounds/2.jpg",
    "/images/postBackgrounds/3.jpg",
    "/images/postBackgrounds/4.jpg",
    "/images/postBackgrounds/5.jpg",
    "/images/postBackgrounds/6.jpg",
    "/images/postBackgrounds/7.jpg",
    "/images/postBackgrounds/8.jpg",
    "/images/postBackgrounds/9.jpg",
    "/images/postBackgrounds/10.jpg",
  ]

  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
    textRef.current.focus()
  }, [cursorPosition, textRef]);

  const handleEmojiClick = ({ emoji }) => {
    const refrence = textRef.current;
    refrence.focus();
    const start = text.substring(0, refrence.selectionStart);
    const end = text.substring(refrence.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };


  const backgroundSelect = (i) => {
    bgRef.current.style = ` background-image:url(${background[i]})`
    bgRef.current.classList.add("bgHander")
    setShowBG(background[i])
  }

  const handlerNoBackground = (i) => {
    bgRef.current.style = ` background-image:""`
    bgRef.current.classList.remove("bgHander")
    setShowBG('')
  }



  return (
    <div className={type2 ? "images_input":""}>
      <div className={type2 ? "" : "flex_center"} ref={bgRef}>
        <textarea
          maxLength="100"
          value={text}
          ref={textRef}
          placeholder={`What's on your mind, ${user?.first_name}`}
          onChange={(e) => setText(e.target.value)}
          className={`post_input ${type2 && "post_input2"}`}
          style={{paddingTop:`${showBG ? Math.abs(textRef.current?.value.length * 0.1 - 33) : "0"}%`}}
        ></textarea>
      </div>
      <div className={`${type2 ? "" : "post_emoji_wrap"}`}>
        {emojiPicker && (
          <div className={`comment_emoji_picker ${type2 ? "pickerMove2": "rlmove"}`}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height="350px"
              width="unset"
              searchDisabled
            />
          </div>
        )}
        <div className={type2 ? "moveLeft icon_wrap": "icon_wrap"}>
          {!type2 && <img src="/icons/colorful.png" alt="background" onClick={()=>setShowBackground(prev=>!prev)}/>}
          
          {!type2  && showBackground && <div className="post_backgrounds scrollbar">
            <img src="/images/postBackgrounds/white.jpg" alt="background" onClick={handlerNoBackground}/>
            {
              background.map((item,i)=>(
                <img src={item} key={i} alt="background" onClick={()=>backgroundSelect(i)}/>
              ))
            }
          </div>}

          <i className="emoji_icon_large" onClick={() => setEmojiPicker(!emojiPicker)}></i>
        </div>
      </div>
    </div>
  );
};

export default EmojiPickerComponent;
