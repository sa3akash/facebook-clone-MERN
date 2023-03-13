import React from 'react'
import { useMediaQuery } from 'react-responsive'

const DateOfBirdSelect = ({handleInputChange,inputs,dateOfbirthErr}) => {

    
    /// get year month day array acording realtime
    const yearArray = Array.from(new Array(108),(value, index)=> new Date().getFullYear() - index)
    const monthArray = Array.from(new Array(12),(value, index)=> 1 + index)
    const numOfDays = ()=>{
        return new Date(inputs.bYear,inputs.bMonth,0).getDate()
    }
    const daysArray = Array.from(new Array(numOfDays()),(value, index)=> 1 + index)



    const desktop = useMediaQuery({
        query: '(min-width: 1170px)'
      })


  return (
    <div className={dateOfbirthErr && !desktop ? "register_grid dateErr" : "register_grid"}>
        <select name="bDay" value={inputs.bDay} onChange={handleInputChange}>
            {
                daysArray.map((day,i)=>(
                    <option key={i} value={day}>{day}</option>
                ))
            }
        </select>
        <select name="bMonth" value={inputs.bMonth} onChange={handleInputChange}>
            {
                monthArray.map((month,i)=>(
                    <option key={i} value={month}>{month}</option>
                ))
            }
        </select>
        <select name="bYear" value={inputs.bYear} onChange={handleInputChange}>
            {
                yearArray.map((year,i)=>(
                    <option key={i} value={year}>{year}</option>
                ))
            }
        </select>
        {dateOfbirthErr && <div className={desktop ? "input_error dateErrorDesktop" : "input_error"}><div className="error_arrow_bottom"></div>{dateOfbirthErr}</div>}
    </div>
  )
}

export default DateOfBirdSelect