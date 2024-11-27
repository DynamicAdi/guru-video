import React from 'react'
import './thanks.scss'
import { BsBoxSeam } from "react-icons/bs";

function Thanks() {
  return (
    <div className='main'>
        <div className="child">
            <BsBoxSeam className="icon" size={90} color='limegreen' />  <br/>
            <h1>Order placed!</h1>
            <h4>Your order has been <span>successfully</span> placed.</h4>
            <p>You'll receive a <span>confirmation email</span> shortly.</p>
            <a href="/menu"><button className='glow'>Explore our menu</button></a>
        </div>
    </div>
  )
}

export default Thanks