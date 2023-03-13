import React from "react";

const Story = ({ story }) => {
  return (
    <div className="story">
      <img src={story.image} alt="story-name" className="story_image" />
      <div className="story_profile_pic">
        <img src={story.profile_picture} alt="profile-pic" />
      </div>
      <div className="story_profile_name">
        {story.profile_name.length > 10
          ? `${story.profile_name.substring(0, 10)}...`
          : story.profile_name}
      </div>
    </div>
  );
};

export default Story;
