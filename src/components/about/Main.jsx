import React from "react";
import "./Main.scss";
import logo from "/GuruAbt.jpeg";

function AboutUs() {
  return (
    <div className="container">
      <h1>About us</h1>
      <div className="child">
        <div className="image">
          <img src={logo} alt="cover" />
        </div>
        <div className="texts">
          <h1>
            The <span>Founder</span>
          </h1>
          <h2>
            Surinder Pal Singh
            <br />
            Managing Director, Guru’s Caterers
          </h2>

          <p> <b>You need to be passionate at what you do</b> – this goes very well with the demeanor of Mr. Surinder Pal, the Managing Director of Guru’s Caterers. He is a passionate foodie and has done a lot of research in the field of Catering, Décor and Customer Service before he started the catering business in 1995.
<br />
<br />
The vision he has is to provide quality service to utmost customer satisfaction. He started small and has scaled high picking up learnings from each and every event he has catered to. Let it be a small or a big event, the dedication levels are at the peak.
<br />
<br />
With the vision he has for Guru’s Caterers,exclusive catering services are provided for all events like Corporate Events, School Events, Weddings & Cocktail Parties, Birthday Parties, House Parties etc. serving the superlative Vegetarian and Non-Vegetarian buffet for all type of Indian, Continental, Chinese, Mexican, Italian and other cuisines.
<br />
<br />
Under his leadership, Guru’s Caterers has won a lot of awards under the Best Catering Service Category in Hyderabad.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
