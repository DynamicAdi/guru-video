import React, { useState } from 'react'
import { IoArrowForwardOutline } from "react-icons/io5";
import "./filledCard.scss";
import { Link } from 'react-router-dom';

function FilledCard({image, title, to}) {
  return (
    <div className="menuCard">
        <div className="image">
            <img src={image} alt={title} />
        </div>
     <div className="content">
        <h2>{title}</h2>
      <Link to={to}>
        <button className="btn">
          Explore <IoArrowForwardOutline className='icon'/>
    </button>
      </Link>
    </div>
    </div>
  )
}

export default FilledCard