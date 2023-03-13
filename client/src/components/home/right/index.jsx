import "./style.css";
import {Dots, NewRoom, Search} from "../../../svg"
import Contact from "./Contact";

const RightSide = ({user}) => {
  return (
    <div className="right_home">
      <div className="right_header">Sponsored</div>
      <div className="spliter1"></div>
      <div className="contacts_wrap">
        <div className="contact_header">
          <div className="contact_header_left">Contacts</div>
          <div className="contact_header_right">
            <div className="contact_circle hover2">
              <NewRoom color="#65676b"/>
            </div>
            <div className="contact_circle hover2">
              <Search color="#65676b"/>
            </div>
            <div className="contact_circle hover2">
              <Dots color="#65676b"/>
            </div>
          </div>
        </div>
        <div className="contact_list">
          <Contact user={user}/>
        </div>
      </div>
    </div>
  )
}

export default RightSide;