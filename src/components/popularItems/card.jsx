import React from 'react'
import './styles.scss'
import { useArray } from '../../funcs/context';
function ColorCard({index, currentCard, id, name, image, desc, isVeg}) {
  const { removeFromArray, addToArray, isInArray} = useArray(); 

    
  const handleAdd = (id) => {
    if (isInArray(id)) {
      return null;
    }
    addToArray(id);
  }
  const handleRemove = (id) => {
    removeFromArray(id);
  }
  return (
    <div className={`card`}>
      <div className="veg" style={isVeg ? {borderColor: 'limegreen'} : {borderColor: 'brown'}}><div className="dot" style={isVeg ? {background: 'limegreen'} : {background: 'brown'}}></div></div>
    <div className="image">
        <img src={image} alt="" />
    </div>
    <div className="content">
       <div className="types">
        <h1>{name}</h1>
        <p>{desc}</p>
       </div>
       <button className="btn" onClick={() => {isInArray(id) ? handleRemove(id) : handleAdd(id)}}>
    {isInArray(id) ? (<>
            Remove from plate -
          </>) : (
            <>
            Add to plate +
            </>
          )}
    </button>
        {/* <button>Add to plate  +</button> */}
    </div>
</div>
  )
}

export default ColorCard