import React from 'react'
import './view.scss'

function DetailsCard({id, title, image, desc, price, isVeg}) {
  return (
    <div className="boxCard">
      <div className="veg" style={isVeg ? {borderColor: 'limegreen'} : {borderColor: 'brown'}}><div className="dot" style={isVeg ? {background: 'limegreen'} : {background: 'brown'}}></div></div>
                        <div className="img">
                            <img src={image} alt="" />
                        </div>
                        <div className="texts">
                            <h2>{title}</h2>
                            <p>{desc}</p>
                            {price && <h3>{price} /-</h3>}
                        </div>
                        </div>
  )
}

export default DetailsCard