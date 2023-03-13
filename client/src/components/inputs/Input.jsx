import { ErrorMessage, useField } from 'formik';
import React from 'react'
import "./style.css";
import {useMediaQuery} from "react-responsive";

const Input = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  const desktopView = useMediaQuery({
    query: '(min-width: 850px)'
  })
  
  return (
    <div className='input_wrapper login_input'>
      {meta.touched && meta.error && !bottom &&
       <div className={desktopView ? "input_error input_error_desktop" : 'input_error'} style={{transform: "translateY(2px)"}}>
          <ErrorMessage name={field.name}/>
          <div className={desktopView ? "error_arrow_left":"error_arrow_top"}></div>
        </div>
      }
     
        <input className={meta.touched && meta.error ? "inputErrorBorder" : ""} type={field.type} name={field.name} placeholder={placeholder} {...field} {...props}/>

        {meta.touched && meta.error && <i className='error_icon' style={{top:`${!desktopView && !bottom ? "61%" : "15px"}`}}></i>}

        {
        meta.touched && meta.error && bottom &&
        <div className={desktopView ? "input_error input_error_desktop" : 'input_error'} style={{transform: "translateY(1px)"}}>
            <ErrorMessage name={field.name}/>
            <div className={desktopView ? "error_arrow_left":"error_arrow_bottom"}></div>
        </div>
      }
    </div>
  )
}

export default Input;