import React from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

const ProfileSkeleton = ({ visitor }) => {
    const mobile = useMediaQuery({
        query: '(max-width: 900px)'
      })
  return (
    <>
      <div className="profile_cover">
        <Skeleton height="100%" width="100%" />
      </div>
      <div className="profile_img_wrap">
        <div className="profilePic_left">
          <div className="profile_w_bg">
            <Skeleton
              circle
              height="100%"
              width="100%"
              style={{ transform: "translateY(-3px)" }}
            />
          </div>
          <div className="profile_w_col">
            <div className="profile_name">
              <Skeleton height="30px" width="150px" />
              <div>
                <Skeleton height="30px" width="50px" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <Skeleton height="30px" width="30px" />
              <Skeleton height="30px" width="60px" />
            </div>
            <div className="profile_friends_images">
              <div style={mobile? {display: "flex",transform:"translateX(20px)"}:{ display: "flex" }}>
              {Array.from(new Array(6),(val,i)=>i+1).map((val,i)=>(
                <Skeleton
                  circle
                  height="30px"
                  width="30px"
                  style={{ transform: `translateX(${- i*8}px)` }}
                  key={i}
                />
              ))}
                
               
              </div>
            </div>
          </div>
        </div>

        <div className="profile_right">
        {
            !visitor ? <>
            <Skeleton height="35px" width="100px" />
          <Skeleton height="35px" width="100px" />
            </>:<>
            <Skeleton height="35px" width="100px" />
          <Skeleton height="35px" width="100px" />
          <Skeleton height="35px" width="100px" />
            </>
        }
          
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
