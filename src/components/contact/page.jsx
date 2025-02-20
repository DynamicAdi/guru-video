import React, { useEffect, useState } from "react";
import "./style.scss";
import Navbar from "../../global/navbar";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import axios from 'axios';


function ContactUs({backend}) {
  const socialMedia = [
    {
      icon: FaInstagram,
      title: "Instagram",
      link: "https://www.instagram.com/instagram.username",
      username: "@instagram.username",
      color: "deeppink",
    },
    {
      icon: FaFacebook,
      title: "Facebook",
      link: "https://www.instagram.com/instagram.username",
      username: "@facebook_username",
      color: "blue",
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      link: "https://www.instagram.com/instagram.username",
      username: "@linkedin_us",
      color: "deepskyblue",
    },
    {
      icon: FaWhatsapp,
      title: "Whatsapp",
      link: "https://www.instagram.com/instagram.username",
      username: "+919086345xx2",
      color: "limegreen",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    subject: '',
  });

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await axios.post(`${backend}/contact`, {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            subject: formData.subject,
        })
        if (response.status === 200) {
            setLoading(false);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                subject: '',
            })
        }
    }
    catch (error) {
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
}


  return (
    <div className="contact">
      <Navbar />
      <div className="children">
        <div className="right">
          <h1>Have any queries?</h1>
          <p>We'll try our best to find solutions for you!</p>
          {socialMedia.map((items, index) => (
            <a
              href={items.link}
              className="socialMedia"
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <div className="icon" style={{ color: `${items.color}` }}>
                <items.icon size={45} />
              </div>
              <div className="headings">
                <div className="title" style={{ color: `${items.color}` }}>
                  {items.title}
                </div>
                <div className="username">{items.username}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="agla">
          <h1>Talk to us!</h1>
          <form className="form">
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="number"
              name="phone"
              required
              placeholder="+91-987654xxxxxx"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/[^\d]/g, "").slice(0, 10),
                })
              }
            />

            <input
              type="email"
              name="email"
              required
              placeholder="xyz@example.com"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value.replace(/\s+/g, ""),
                })
              }
            />
            <input
              type="text"
              name="name"
              required
              placeholder="Subject"
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
            <textarea
              name="address"
              required
              placeholder="Your message..."
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>

            <button type="submit" className="glow" onClick={
                loading ? () => {} : (e) => sendEmail(e)
                }>
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
