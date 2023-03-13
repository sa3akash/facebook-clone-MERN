import React from 'react'

const GridPost = () => {
  return (
    <div className='create_post'>
        <div className="create_post_header">
            <div className="left_header_grid">Posts</div>
            <div className="grid_icon_wrap">
                <div className="gray_btn hover2"><i className="equalize_icon"></i>Filters</div>
                <div className="gray_btn hover2"><i className="manage_icon"></i>Manage Post</div>
            </div>
        </div>
        <div className="create_splitter"></div>
        <div className="create_post_body grid_2">
            <div className="view_type active"><i className="list_icon filter_blur"></i>List View</div>
            <div className="view_type"><i className="grid_icon"></i>Grid View</div>
        </div>
    </div>
  )
}

export default GridPost;