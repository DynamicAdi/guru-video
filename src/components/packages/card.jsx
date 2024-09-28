import React from 'react'
import "./styles.scss";

function Card({id, title, desc, image}) {
  return (
    <div className="box">
    <div className="image">
        <img src="https://picsum.photos/600" alt="Image" />
    </div>
    <div className="content">
        <h2>Title of the packages</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium sapiente provident at ad nam. Perferendis.</p>
        <button>View more</button>
    </div>
</div>
  )
}

export default Card