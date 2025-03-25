import React from "react";
import "./styles.scss";
import logo from "/logo.png";
import {
  MdLocationPin,
  MdOutlineEmail,
  MdOutlineLocalPhone,
} from "react-icons/md";

function Footer() {
  const tabs = [
    {
      name: "Home",
      to: "/#home",
    },
    {
      name: "About",
      to: "/about-us",
    },
    {
      name: "Popular items",
      to: "/#popular",
    },
    {
      name: "Packages",
      to: "/packages",
    },
    {
      name: "Corporate box",
      to: "/corporate",
    },
    {
      name: "Menu",
      to: "/menu",
    },
  ];
  return (
    <div className="footer">
      <div className="container">
        <div className="logo">
          <div className="image">
            <img src={logo} alt="logo" />
          </div>
          <div className="words">
            <p>
            Creating A Setting That Stays Forever. We welcome you to our catering and décor hub that can let you breathe easy and enjoy the event to the fullest.
            </p>
          </div>
        </div>
        <div className="quickLinks">
          <h1>Quick Links</h1>
          <ul>
            {
              tabs.map((tab, index) => {
                return (
                  <a href={tab.to} style={{textDecoration: 'none', color: 'white'}}>
                  <li className="link">{tab.name}</li>
                  </a>
                )
              })
            }
          </ul>
        </div>
        <div className="quickLinks">
          <h1>Contact info</h1>
          <ul>
            <a href="tel:+91 9000081351" style={{color: 'white'}}>
            <li>
              <MdOutlineLocalPhone /> 9000081351
            </li>
            </a>
            <a href="mailto:info@guruscaterers.com" style={{color: 'white'}}>
            <li>
              <MdOutlineEmail /> info@guruscaterers.com
            </li>
            </a>
            <li>
              <MdLocationPin /> H:No: 4-R1-072, 1st floor, Beside West Marredpally Police Station, Secunderabad-500026
            </li>
          </ul>
        </div>
        <p className="copyright">
          All the copyrights are reserved by <a href="https://outrightcreators.com" style={{textDecoration: 'underline', color: 'white'}}>Outright Creators</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
