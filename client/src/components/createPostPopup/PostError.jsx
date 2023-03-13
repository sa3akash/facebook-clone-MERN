import React from 'react'

const PostError = ({error, setError}) => {
  return (
    <div className='postError'>
        <span>{error}</span>
        <button className='blu_btn' onClick={()=>setError('')}>Try again</button>
    </div>
  )
}

export default PostError