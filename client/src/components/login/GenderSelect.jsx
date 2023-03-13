import React from 'react'
import { useMediaQuery } from 'react-responsive'

const GenderSelect = ({handleInputChange,genderErr}) => {

    const desktop = useMediaQuery({
        query: '(min-width: 1170px)'
      })
  return (
    <div className={genderErr && !desktop ? "register_grid genderErr" : "register_grid"}>
    <label htmlFor="male">
        Male <input type="radio" name="gender" id="male" value="male" onChange={handleInputChange}/>
    </label>
    <label htmlFor="feMale">
        Female <input type="radio" name="gender" id="feMale" value="female" onChange={handleInputChange}/>
    </label>
    <label htmlFor="custom">
        Custom <input type="radio" name="gender" id="custom" value="custom" onChange={handleInputChange}/>
    </label>
    {genderErr && <div className={desktop ? "input_error genderErrorDesktop" : "input_error"}><div className="error_arrow_bottom"></div>{genderErr}</div>}
</div>
  )
}

export default GenderSelect