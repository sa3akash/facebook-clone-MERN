import "./style.css"
import PropagateLoader from "react-spinners/PropagateLoader";


const ActivateForm = ({type, header, text, loading}) => {
  return (
    <div className="blur">
        <div className="popup">
            <div className={`popup_header ${type==="success" ? "success_text" : "error_text"}`}>{header}</div>
            <div className="popup_message">{text}</div>
            <PropagateLoader color="#1876f2" loading={loading} size="25px"/>
        </div>
    </div>
  )
}

export default ActivateForm