import { ErrorMessage, useField } from 'formik';
import React from 'react'
import "./style.css";
import {useMediaQuery} from "react-responsive";

const RegisterInputs = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  
  const desktop = useMediaQuery({
    query: '(min-width: 1170px)'
  })
  
  return (
    <div className='input_wrapper register_input_wrap'>

        <input className={meta.touched && meta.error ? "inputErrorBorder" : ""} type={field.type} name={field.name} placeholder={placeholder} {...field} {...props}/>

        {meta.touched && meta.error && <i className='error_icon' style={{top:`${!desktop && "15px"}`}}></i>}

        {
        meta.touched && meta.error &&
        <div className={desktop ? `input_error input_error_desktop ${props.name==="last_name"? "error_surname": ""}` : 'input_error'} style={{transform: "translateY(1px)"}}>
            <ErrorMessage name={field.name}/>
            <div className={desktop ? "error_arrow_left":"error_arrow_bottom"}></div>
        </div>
      }
    </div>
  )
}

export default RegisterInputs;