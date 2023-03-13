import React from 'react'

const LeftLinks = ({img, notification,text}) => {
  return (
    <div className='left_link hover2'>
        <img src={`/left/${img}.png`} alt="icon" />
        {
            notification !== undefined ? (
                <div className="col">
                    <div className="col_1">{text}</div>
                    <div className="col_2">{notification}</div>
                </div>
            ) : (
                <div className="col">
                    <div className="col_1">{text}</div>
                </div>
            )
        }
    </div>
  )
}

export default LeftLinks;