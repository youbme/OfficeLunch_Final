import React from 'react'

import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
export default function DropDownCalender({setCalendartype}) {


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
     
      
          
          <option value="Single">Single</option>
          <option value="Range">Range</option>
          <AiFillCaretDown></AiFillCaretDown>
        </select>
        </div>
       
      </div>

    </>
  )
}
