import React from 'react';
import { Dots } from '../../svg';
import {stories} from "../../data/homeData";
import FriendSmallCard from './FriendSmallCard';

const PeopleYouMayKnow = () => {
  return (
    <div className='ppumayno'>
        <div className="people_header">
            People Your May Know 
            <div className="post_header_right ppl_circle hover2"><Dots/></div></div>
        <div className="ppumk_list">
            {stories && stories.map((story,index)=>(
                <FriendSmallCard item={story} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default PeopleYouMayKnow;