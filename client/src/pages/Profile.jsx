import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loading_profile,
  all_profile,
  error_profile,
} from "../store/ProfileReducer";
import axios from "axios";
import Header from "../components/header/Header";
import { useState } from "react";
import "./style/Profile.css";
import Cover from "../components/profilePage/Cover";
import ProfilePicInfos from "../components/profilePage/ProfilePicInfos";
import ProfileMenu from "../components/profilePage/ProfileMenu";
import PeopleYouMayKnow from "../components/profilePage/PeopleYouMayKnow";
import CreatePost from "../components/createPost";
import CreatePostPopup from "../components/createPostPopup";
import GridPost from "../components/profilePage/GridPost";
import SinglePost from "../components/post/SinglePost";
import Photos from "../components/profilePage/Photos";
import Friends from "../components/profilePage/Friends";
import Intro from "../components/intro";
import { useMediaQuery } from "react-responsive";
import ProfileSkeleton from "../components/profilePage/ProfileSkeleton";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const [openPost, setOpenPost] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const { username } = useParams();
  const { user, darkTheme } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [getUsername, setGetUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const { profile, loading } = useSelector((state) => state.Profile);

  const visitor = username === user.username ? false : true;

  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      dispatch(loading_profile());
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/getProfile/${username}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        dispatch(all_profile(data));
        setProfilePicture(data?.picture);
        
      } catch (err) {
        dispatch(error_profile(err.response.data.message));
        navigate("/404")
      }
    };
    getProfile();
  }, [dispatch, navigate, user, username]);

  // height work

  const check = useMediaQuery({
    query: "(min-width:901px)",
  });

  const profileTop = useRef(null);
  const profileleft = useRef(null);

  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scorHeight, setScorHeight] = useState();

  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(profileleft.current.clientHeight);
    window.addEventListener("scroll", getScore, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScore, { passive: true });
    };
  }, [loading, scorHeight]);

  const getScore = () => {
    setScorHeight(window.pageYOffset);
  };

  return (
    <div className={darkTheme ? "profile_page dark" : "profile_page"}>
      <Header page="profile" />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {loading ? (
            <ProfileSkeleton visitor={visitor} />
          ) : (
            <>
              <Cover
                cover={profile?.coverPicture}
                visitor={visitor}
                user={user}
              />
              <ProfilePicInfos
                profile={profile}
                visitor={visitor}
                getUsername={getUsername}
                user={user}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
              />
            </>
          )}

          <ProfileMenu />
        </div>
      </div>

      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div
                className={`${
                  check && scorHeight >= height && leftHeight > 950
                    ? "scrollFixed showLess"
                    : check &&
                      scorHeight >= height &&
                      leftHeight < 1000 &&
                      "scrollFixed showMore"
                }`}
              >
                <div
                  className="profile_grid_left"
                  ref={profileleft}
                  style={check ? { marginTop: "0px" } : { marginTop: "10px" }}
                >
                  {loading ? (
                    <>
                      <div className="profile_card">
                        <div className="profile_card_header">
                          <span>Intro</span>
                        </div>
                        <div className="spiner_loader">
                          <HashLoader color="#1876f2" />
                        </div>
                      </div>
                      <div className="profile_card">
                        <div className="profile_card_header">
                          <span>Photos</span>
                          <span className="profile_header_link">
                            See all photos
                          </span>
                        </div>
                        <div className="spiner_loader">
                          <HashLoader color="#1876f2" />
                        </div>
                      </div>
                      <div className="profile_card">
                        <div className="profile_card_header">
                          <span>Friends</span>
                          <span className="profile_header_link">
                            See all friends
                          </span>
                        </div>
                        <div className="spiner_loader">
                          <HashLoader color="#1876f2" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Intro
                        details={profile.details}
                        visitor={visitor}
                        user={user}
                        setGetUsername={setGetUsername}
                      />
                      <Photos username={username} user={user} />
                      <Friends friends={profile.friends} />
                    </>
                  )}
                  <div className="profile_copyright">
                    <Link to="/">Privacy </Link> <span>. </span>
                    <Link to="/">Terms </Link> <span>. </span>
                    <Link to="/">Advertising </Link> <span>. </span>
                    <Link to="/">
                      Ad Choices <i className="ad_choices_icon"></i>
                    </Link>{" "}
                    <span>. </span>
                    <Link to="/">Cookies </Link> <span>. </span>
                    <Link to="/">More </Link> <span>. </span>
                    <p>Meta &copy; {new Date().getFullYear()}</p>
                  </div>
                </div>
              </div>

              <div className="profile_grid_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    setOpenPost={setOpenPost}
                    setShowPrev={setShowPrev}
                    profile
                  />
                )}
                {openPost && (
                  <CreatePostPopup
                    user={user}
                    setOpenPost={setOpenPost}
                    showPrev={showPrev}
                    setShowPrev={setShowPrev}
                    profilePost
                  />
                )}
                <GridPost />
                {loading ? (
                  <div className="spiner_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {profile?.posts?.length ? (
                      profile?.posts.map((post) => (
                        <SinglePost key={post._id} post={post} user={user} />
                      ))
                    ) : (
                      <div className="no_posts">No Post Available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// ${ check && scorHeight >= height && leftHeight > 1000 ? "scrollFixed showLess" : check && scorHeight >= height && leftHeight < 1000 && "scrollFixed showMore"}
