import React from 'react'
import './view.scss'

function DetailsCard({id, title, image, desc, price}) {
  return (
    <div className="boxCard">
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