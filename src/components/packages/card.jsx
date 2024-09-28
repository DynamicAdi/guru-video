import React, { useEffect } from 'react'
import "./styles.scss";
import { Link } from 'react-router-dom';

function Card({id, title, desc, image}) {
  return (
    <div className="box">
    <div className="image">
        <img src={`${image[0]}`} alt="Image" />
    </div>
    <div className="content">
        <h2>{title}</h2>
        <p>{desc}</p>
       <Link to={'/packages/items'} state={{id: id}}>
        <button>View more</button>
       </Link>
    </div>
</div>
  )
}

export default Card