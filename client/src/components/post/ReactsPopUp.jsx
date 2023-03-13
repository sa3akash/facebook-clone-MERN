
const ReactsPopUp = ({handleReact,setIsReactPopup}) => {
    const reactsArray = [
        {
          name: "like",
          image: "/reacts/like.gif",
        },
        {
          name: "love",
          image: "/reacts/love.gif",
        },
        {
          name: "haha",
          image: "/reacts/haha.gif",
        },
        {
          name: "wow",
          image: "/reacts/wow.gif",
        },
        {
          name: "sad",
          image: "/reacts/sad.gif",
        },
        {
          name: "angry",
          image: "/reacts/angry.gif",
        },
      ];


  return (
    <div className='reacts_popup' onMouseEnter={()=>setTimeout(() =>  setIsReactPopup(true) , 500)} onMouseLeave={()=>setTimeout(() => setIsReactPopup(false), 500)}>
        {
            reactsArray && reactsArray.map((r, i)=>(
                <div className="react" key={i} onClick={()=>handleReact(r.name)}>
                    <img src={r.image} alt={r.name} />
                </div>
            ))
        }
    </div>
  )
}

export default ReactsPopUp;
// onMouseOver={()=>{ setTimeout(() => { setIsReactPopup(true) }, 500)}} onMouseLeave={()=>{ setTimeout(() => { setIsReactPopup(false) }, 500)}}