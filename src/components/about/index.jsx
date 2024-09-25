import React from 'react'
import "./styles.scss"
import plate from "/plate.png";
import {IoIosArrowRoundForward} from "react-icons/io"

function About() {
  return (
    <div className='about' id='about'>
        <div className="upperText">
        <h2>What makes <span>us</span></h2>
        <h1>Best <span>caterers</span> near you !</h1>
        </div>
        <div className="middle">
            <div className="content">
               <p>We are known as one of the best catering services in Hyderabad and Secunderabad. The reason behind this achievement is that we have handpicked our staff after proper screening and assessment of culinary skills. One can be assured that we have excellent etiquettes to match his expectations in terms of service.
    <br /><br />
Our Professional caterers staff are polite and ensure that the service is delivered as per your custom needs. So, you can have your event covered seamlessly.</p>
            <button className="glow">Learn more <IoIosArrowRoundForward size={32} /></button>
            

            <div className="stats">
                <div className="box">
                    <h1>10K+</h1>
                    <p>Events Finished Successfully</p>
                </div>
                <div className="box">
                    <h1>300K+</h1>
                    <p>Happy Customers</p>
                </div>
                <div className="box">
                <h1>27+</h1>
                <p>Years of experience</p>
                </div>

            </div>
            </div>
            <div className="images">
                <div className="dot">
                    <img src={plate} alt="plate" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About