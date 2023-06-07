import React from 'react'

import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
export default function DropDownCalender({setCalendartype}) {

    // const [open, setOpen] = React.useState(false);
    const[reporttype, setreporttype]= useState("Single");

       

  const handleOptionChange = (event) => {
    setreporttype( event.target.value );
    console.log(reporttype)
   
  }
  if(reporttype === 'Single'){
    setCalendartype(true)
} else if(reporttype === 'Range'){
    setCalendartype(false)
}
  return (
    <>
     <div className='forDropbotton' >
      <div><p>Report type</p></div>
      <div>
        <select  value={reporttype} onChange={handleOptionChange} >
     
          {/* <option selected disabled>Select an option</option> */}
          
          <option value="Single">Single</option>
          <option value="Range">Range</option>
          <AiFillCaretDown></AiFillCaretDown>
        </select>
        </div>
        {/* <p>Selected option: {this.state.selectedOption}</p> */}
      {/* <button className='forDropbotton' onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul  >
            
          <li>
            <button onClick={handleMenuOne}>Specific Date</button>
          </li>
          <li >
            <button onClick={handleMenuTwo}>Range Date</button>
          </li>
        </ul>
      ) : null} */}
      </div>

    </>
  )
}
