import axios from "axios";
import { useEffect, useState } from "react";
import Bio from "./Bio";
import EditDetails from "./EditDetails";
import "./intro.css";

const Intro = ({details,visitor,user,setGetUsername}) => {

    const initial = {
        bio: details?.bio ? details?.bio : "",
        otherName: details?.otherName ? details.otherName : "",
        job: details?.job ? details.job : "",
        workPlace: details?.workPlace ? details.workPlace : "",
        highSchool: details?.highSchool ? details.highSchool : "",
        college: details?.college ? details.college : "",
        currentCity: details?.currentCity ? details.currentCity : "",
        homeTown: details?.homeTown ? details.homeTown : "",
        relationShip: details?.relationShip ? details.relationShip : "",
        instagram: details?.instagram ? details.instagram : "",
    }

    const [userDetails, setUserDetails] = useState(initial)
    const [showBio, setShowBio] = useState(false)
    const [maxInputValue, setMaxInputValue] = useState(userDetails?.bio ? 60 - userDetails?.bio?.length : 60)
    const [showEditDetails, setShowEditDetails]= useState(0)
    
    const handleChange = (e) => {
        setUserDetails(prev=>({...prev, [e.target.name] : e.target.value}))
        setMaxInputValue(60 - e.target.value.length)
    }
    
    useEffect(()=>{
      details && setUserDetails({bio: details.bio, job: details.job, otherName: details.otherName,workPlace:details.workPlace,highSchool:details.highSchool,college:details.college,currentCity:details.currentCity,homeTown:details.homeTown,relationShip: details.relationShip,instagram:details.instagram})
    },[details])
   
    useEffect(()=>{
        setGetUsername(userDetails?.otherName)
    },[setGetUsername, userDetails?.otherName])

    const updateUser = async () => {
        try{

            const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updateDetails`,{userDetails},{ headers:{ Authorization: `Bearer ${user.token}` } })
            setUserDetails(data)
            setShowBio(false)
        }catch(err){
            console.log(err.response.data.massage);
        }
    }


  return (
    <div className='profile_card'>
        <div className="profile_card_header"> <span>Inro</span></div>

        {userDetails?.bio && !showBio && (
            <div className="info_col">
                <span className="bio_text">{userDetails.bio}</span>
                {!visitor && <button className="gray_btn hover2" onClick={()=>setShowBio(true)}>Edit bio</button>}
            </div>
        )}
        {showBio && <Bio value={userDetails?.bio} handleChange={handleChange} maxInputValue={maxInputValue} setShowBio={setShowBio} updateUser={updateUser} name="bio" /> }
            { !userDetails?.bio && !visitor && !showBio && (
               <button className="gray_btn hover2 w100" onClick={()=>setShowBio(true)}>Add bio</button>
            )}
        {userDetails?.job && userDetails.workPlace ? (
            <div className="info_profile">
                <img src="/icons/job.png" alt="" />
                <span>Works as {userDetails.job} at <b>{userDetails.workPlace}</b></span>
            </div>
        ): userDetails?.job && !userDetails.workPlace ? (
            <div className="info_profile">
                <img src="/icons/job.png" alt="" />
                <span>Works as {userDetails.job}</span>
            </div>
        ) : !userDetails?.job && userDetails.workPlace &&  (
            <div className="info_profile">
                <img src="/icons/job.png" alt="" />
                <span>Works at {userDetails.workPlace}</span>
            </div>
        )}
        {userDetails?.relationShip && (
            <div className="info_profile">
                <img src="/icons/relationship.png" alt="" />
                <span>{userDetails.relationShip}</span>
            </div>
        )}
        {userDetails?.college && (
            <div className="info_profile">
                <img src="/icons/studies.png" alt="" />
                <span>Studied at {userDetails.college}</span>
            </div>
        )}
        {userDetails?.highSchool && (
            <div className="info_profile">
                <img src="/icons/studies.png" alt="" />
                <span>Studied at {userDetails.highSchool}</span>
            </div>
        )}
        {userDetails?.currentCity && (
            <div className="info_profile">
                <img src="/icons/from.png" alt="" />
                <span>Lives in {userDetails.currentCity}</span>
            </div>
        )}
        {userDetails?.homeTown && (
            <div className="info_profile">
                <img src="/icons/home.png" alt="" />
                <span>From {userDetails.homeTown}</span>
            </div>
        )}
        {userDetails?.instagram && (
            <div className="info_profile">
                <img src="/icons/instagram.png" alt="" />
                <a href={`https://www.instagram.com/${userDetails.instagram}`} target="_blank" rel="noreferrer" >{userDetails.instagram}</a>
            </div>
        )}
        {!visitor && <button className="gray_btn hover2 w100" onClick={()=>setShowEditDetails(1)}>Edit Detalis</button>}
        {!visitor && <button className="gray_btn hover2 w100">Add Hobbis</button>}
        {!visitor && <button className="gray_btn hover2 w100">Add Featured</button>}

        {showEditDetails === 1 && !visitor && <EditDetails setShowEditDetails={setShowEditDetails} userDetails={userDetails} setUserDetails={setUserDetails} user={user}/>}
    </div>
  )
}

export default Intro