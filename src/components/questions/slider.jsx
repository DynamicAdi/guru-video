import React, { useState } from 'react'
import './styles.scss'
import {LuPlus} from "react-icons/lu";


function OpenFaq({question, answer}) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
  return (
    <div className={`box ${open ? 'answer' : ''}`} onClick={toggleOpen}>
    <p>{question}</p>
    <LuPlus size={22} className='ico'/>
    <p className={`qAns ${open ? 'open' : ""}`}>
      {answer}
    </p>
</div>
  )
}

export default OpenFaq