import "./style.css";
import {ArrowRight, Plus} from "../../../svg"
import { stories } from "../../../data/homeData";
import Story from "./Story";
import {useMediaQuery} from "react-responsive"

const Stories = () => {

    const query550px = useMediaQuery({query: "(max-width: 550px)"})
    const query450px = useMediaQuery({query: "(max-width: 450px)"})

    let max =query450px ? 3 : query550px? 4 : stories.length;
    
    
  return (
    <div className="home_stories">
        <div className="create_story_card">
            <img src="/images/default_pic.png" alt="" />
            <div className="plus_story">
                <Plus color="#fff"/>
            </div>
            <div className="story_create_text">Create Story</div>
        </div>
        {
            stories.slice(0,max).map((story, index)=>(
               <Story key={index} story={story}/>
            ))
        }
        <div className="white_circle hover2">
            <ArrowRight color="#65676b"/>
        </div>
    </div>
  )
}

export default Stories;