import { useRef } from 'react';
import useClickOutSide from '../../helpers/OutsideClick';
import Detail from './Detail'

const EditDetails = ({setShowEditDetails,userDetails,setUserDetails,user}) => {

    const detailRef = useRef(null)

    useClickOutSide(detailRef, ()=> setShowEditDetails(false))

  return (
    <div className='blur'>
        <div className="post_box details_box" ref={detailRef}>
            <div className="post_box_header">
                 <span>Edit Details</span>
                 <div className="small_circle" onClick={()=>setShowEditDetails(0)}><i className="exit_icon"></i></div>
            </div>
            <div className="details_wrapper scrollbar">
                <div className="details_col">
                    <span>Customize your Intro</span>
                    <span>Details you select will be public</span>
                </div>

                <div className="detail_header">Other Name</div>
                <Detail
                placeholder="Add Othername"
                name="otherName"
                value={userDetails?.otherName}
                img="studies"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />

                <div className="detail_header">Work</div>
                <Detail
                placeholder="Add job title"
                name="job"
                value={userDetails?.job}
                img="job"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />
                <Detail
                placeholder="Add work place"
                name="workPlace"
                value={userDetails?.workPlace}
                img="job"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />

                <div className="detail_header">Education</div>
                <Detail
                placeholder="Add highSchool"
                name="highSchool"
                value={userDetails?.highSchool}
                img="studies"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />
                <Detail
                placeholder="Add college"
                name="college"
                value={userDetails?.college}
                img="studies"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />

                <div className="detail_header">Current City</div>
                <Detail
                placeholder="Add Current City"
                name="currentCity"
                value={userDetails?.currentCity}
                img="from"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />
                <div className="detail_header">Home Town</div>
                <Detail
                placeholder="Add home town"
                name="homeTown"
                value={userDetails?.homeTown}
                img="home"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />
                <div className="detail_header">RelationShip</div>
                <Detail
                placeholder="Add relationShip"
                name="relationShip"
                value={userDetails?.relationShip}
                img="relationship"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                rel
                />
                <div className="detail_header">Instagram</div>
                <Detail
                placeholder="Add instagram"
                name="instagram"
                value={userDetails?.instagram}
                img="instagram"
                user={user}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                />

            </div>
        </div>
    </div>
  )
}

export default EditDetails;