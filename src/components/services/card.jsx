import React from 'react'
import './styles.scss'

function ServeCard({img, name}) {
  return (
    <div className="servCardBox">
    <div className="servCardImg">
        <img src={img} alt={name} />
    </div>
    <h1 className='tagTitle'>
      {name}
    </h1>
</div>
  )
}

export default ServeCard