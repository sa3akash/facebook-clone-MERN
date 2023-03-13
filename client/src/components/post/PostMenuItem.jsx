import React from 'react'

const PostMenuItem = ({icon, img, title, subtitle,onClick}) => {
  return (
    <li className="hover1" onClick={onClick}>
        { img ? (<img src={img} alt="icon"/>) : (<i className={icon}></i>) }
        <div className="postMenuText">
            <span>{title}</span>
            {subtitle && (
                <span className='menu_sub_text'>{subtitle}</span>
            )}
        </div>
    </li>
  )
}

export default PostMenuItem