import React, { useEffect, useState } from "react";
import "./style.scss";
import Navbar from "../../global/navbar";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import axios from "axios";

function ContactUs({ backend }) {
  const socialMedia = [
    {
      icon: FaInstagram,
      title: "Instagram",
      link: "https://www.instagram.com/guru_caterers",
      username: "@guru_caterers",
      color: "deeppink",
    },
    {
      icon: FaFacebook,
      title: "Facebook",
      link: "https://www.facebook.com/guruscaterershyd",
      username: "@guruscaterershyd",
      color: "blue",
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/gurus-caterers-3b6747358",
      username: "Gurus Caterers",
      color: "deepskyblue",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    subject: "",
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
      });

      const mailToUser = await axios.post(`${backend}/contactCorporate`, {
        name: formData.name,
        email: formData.email,
        subject: "We Have Received Your Query 📬 - Guru's Catereres",
        contact: false,
        message: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You | Guru's Caterers</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            color: #000;
        }
        .container {
            max-width: 500px;
            margin: 50px auto;
            text-align: center;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-radius: 10px;
        }
        .logo img {
            width: 150px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 40px;
            line-height: 1.6;
        }
        .highlight {
            color: #FFC04C;
            font-weight: 600;
        }
        .action-section {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column-reverse;
            gap: 30px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }
        .btn {
            background-color: #FFC04C;
            color: #000;
            padding: 14px 35px;
            border: none;
            border-radius: 30px;
            text-decoration: none;
            font-size: 1.1rem;
            transition: 0.3s;
            display: inline-block;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .qr-code img {
            width: 100px;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9rem;
            color: #555;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="logo">
        <img src="cid:logoImg" width="150" height="80" alt="Guru's Caterers Logo">
    </div>
    <h1>Thank You!</h1>
    <p>We have received your message and it’s on its way to us!<br>
       Our team will get back to you shortly. Meanwhile, check out our <span class="highlight">delicious offerings</span>!</p>
    <div class="action-section">
        <a href="https://www.guruscaterers.com/menu" class="btn">View Our Menu</a>
        <div class="qr-code">
            <img src="cid:scannerImg" width="100" height="100" alt="Scan to view menu">
        </div>
    </div>
    <div class="footer">
        &copy; 2025 Guru's Caterers | Powered By <a href="https://www.outrightcreators.com/">Outright Creators</a>
    </div>
</div>

</body>
</html>
        `,
      })
      if (response.status === 200 && mailToUser.status === 200) {
        setLoading(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          subject: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
              type="text"
              name="phone"
              required
              maxLength={10}
              pattern="\d{10}"
              placeholder="987654xxxx"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/[^\d]/g, "").slice(0, 10), // Allows only digits, max 10
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

            <button
              type="submit"
              className="glow"
              onClick={loading ? () => {} : (e) => sendEmail(e)}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
