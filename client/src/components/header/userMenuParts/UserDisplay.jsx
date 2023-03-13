import {useDispatch,useSelector} from 'react-redux'
import { setCompact, setDarkTheme } from '../../../store/AuthReducer';

const UserDisplay = ({ setVisible }) => {

  const {darkTheme,compactMode} = useSelector(state=>state.Auth)

  const dispatch = useDispatch()

  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="circle hover1" onClick={() => setVisible(0)}>
          <i className="arrow_back_icon"></i>
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu_main">
        <div className="small_circle" style={{width:"60px"}}>
          <i className="dark_filled_icon"></i>
        </div>

        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1" onClick={()=>dispatch(setDarkTheme(false))}>
        <span>Off</span>
        {darkTheme ? 
        <input type="radio" name="mode" id="darkOff"/>
        :
        <input type="radio" name="mode" id="darkOff" defaultChecked/>}
        
      </label>
      <label htmlFor="darkOn" className="hover1" onClick={()=>dispatch(setDarkTheme(true))}>
        <span>On</span>
        {darkTheme ? 
        <input type="radio" name="mode" id="darkOn" defaultChecked/>
        :
        <input type="radio" name="mode" id="darkOn"/>}
        
      </label>
      <div className="mmenu_main">
        <div className="small_circle" style={{width:"50px"}}>
          <i className="compact_icon"></i>
        </div>

        <div className="mmenu_col">
          <span className="mmenu_span1">Compact Mode</span>
          <span className="mmenu_span2">
          Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1" onClick={()=>dispatch(setCompact(false))}>
        <span>Off</span>
        {compactMode ? 
        <input type="radio" name="compact" id="compactOff"/>
        :
        <input type="radio" name="compact" id="compactOff" defaultChecked/>}
        
      </label>
      <label htmlFor="compactOn" className="hover1" onClick={()=>dispatch(setCompact(true))}>
        <span>On</span>
        {compactMode ? 
        <input type="radio" name="compact" id="compactOn" defaultChecked/>
        :
        <input type="radio" name="compact" id="compactOn" />}
        
      </label>
      <div className="mmenu_item hover3">
        <div className="small_circle">
            <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
            <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;
