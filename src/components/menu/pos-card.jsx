import React, { useState } from 'react'
import {IoAddOutline, IoRemove} from 'react-icons/io5'
import './posCard.scss'
import { useArray } from '../../funcs/context';
function PosCard({id, image, title, desc, veg}) {
  const {myArray, removeFromArray, addToArray, isInArray} = useArray();
  
  const handleAdd = (id) => {
    if (isInArray(id)) {
      return null;
    }
    addToArray(id);
    console.log(myArray);
    
  }
  const handleRemove = (id) => {
    removeFromArray(id);
    console.log(myArray);  

  }

  return (
    <div className="cards">
    <div className="image">
        <img src={image} alt={title} />
    </div>
      <div className="veg" style={veg ? {borderColor: 'limegreen'} : {borderColor: 'brown'}}><div className="dot" style={veg ? {background: 'limegreen'} : {background: 'brown'}}></div></div>
    

    <h1 className='title'>{title}</h1>
    <p>{desc}</p>
    <button className="btn" onClick={() => {isInArray(id) ? handleRemove(id) : handleAdd(id)}}>
    {isInArray(id) ? (<>
            <IoRemove className='icon remove'/> Remove from plate
          </>) : (
            <>
            <IoAddOutline className='icon'/>Add to plate
            </>
          )}
    </button>
    </div>
  )
}

export default PosCard