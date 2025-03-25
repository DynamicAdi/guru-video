import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import image from "../../assets/image.jpg";

function BuyNow({ url }) {
  const location = useLocation();
  const { name, activeTab } = location.state || "";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    itemName: name,
    name: "",
    phone: "",
    email: "",
    date: "",
    address: "",
    customize: false,
  });

  const [address, setAddress] = useState({
    area: "",
    landmark: "",
    city: "",
    pincode: "",
  });
  let finalAddress =
    address.area +
    ", " +
    address.landmark +
    ", " +
    address.city +
    ", " +
    address.pincode;

  const [windowSize, setWindows] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setWindows(true);
    }
  }, [window.innerWidth]);

  const handleFinal = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/orderCorporate`, {
        itemName: formData.itemName,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        address: finalAddress,
      });
      const email = await axios.post(`${url}/contactCorporate`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: "New Order",
        message: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation | Guru's Caterers</title>
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
            font-size: 2.8rem;
            margin-bottom: 20px;
            color: #000;
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
    <h1>Thank You for Your Order!</h1>
    <p>We have received order for your ${functionDetails.functionType} on ${formData.date}!<br>
       We are preparing something delicious just for you! <br>
       Keep an eye on your inbox for the confirmation email and delivery updates.</p>
    <div class="action-section">
        <a href="https://www.guruscaterers.com/" class="btn">Return to Home</a>
        <div class="qr-code">
            <img src="cid:scannerImg"  width="100" height="100" alt="Scan to view menu">
        </div>
    </div>
    <p class="highlight">We can’t wait to serve you again soon!</p>
    <div class="footer">
        &copy; 2025 Guru's Caterers | Made with ❤️ for food lovers
    </div>
</div>

</body>
</html>
        `,
      });
      if (response.status === 200 && email.status === 200) {
        setLoading(false);
        window.location.replace("/corporate/thanks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFinalPackage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/orderpackages`, {
        itemName: formData.itemName,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        address: finalAddress,
        customize: formData.customize,
      });
      const email = await axios.post(`${url}/contactCorporate`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: "We have Received Your Order - Guru's Caterers",
        message: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation | Guru's Caterers</title>
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
            font-size: 2.8rem;
            margin-bottom: 20px;
            color: #000;
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
    <h1>Thank You for Your Order!</h1>
    <p>We have received order for your ${functionDetails.functionType} on ${formData.date}!<br>
       We are preparing something delicious just for you! <br>
       Keep an eye on your inbox for the confirmation email and delivery updates.</p>
    <div class="action-section">
        <a href="https://www.guruscaterers.com/" class="btn">Return to Home</a>
        <div class="qr-code">
            <img src="cid:scannerImg"  width="100" height="100" alt="Scan to view menu">
        </div>
    </div>
    <p class="highlight">We can’t wait to serve you again soon!</p>
    <div class="footer">
        &copy; 2025 Guru's Caterers | Made with ❤️ for food lovers
    </div>
</div>

</body>
</html>
        `
      });
      if (response.status === 200 && email.status === 200) {
        setLoading(false);
        window.location.replace("/corporate/thanks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="main">
      <div className="backme" onClick={() => window.history.back()}>
        Back
      </div>
      <div className="child">
        <div
          className="image"
          style={windowSize ? { display: "none" } : { display: "block" }}
        >
          <img src={image} alt="alt from" />
        </div>
        <div className="content">
          <div className="uperWala">
            <h1>Checkout</h1>
          </div>
          <form className="form" style={{ gap: "0.5rem" }}>
            <input
              type="text"
              name="name"
              required
              placeholder={`${name}`}
              readOnly
              style={{ cursor: "not-allowed" }}
            />

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
            {activeTab === "packages" && (
              <select
                required
                name="customize"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customize: e.target.value === "true",
                  })
                }
              >
                <option>Do you want to customize menu?</option>
                <option value={false}>
                  No, I don't want any customization
                </option>
                <option value={true}>Yes, I want to Customize</option>
              </select>
            )}
            <input
              type="date"
              name="date"
              required
              min={today}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <input
              type="text"
              name="area"
              placeholder="Area, Street, Sector, Village"
              required
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (optional)"
              required
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
            />
            <input
              type="text"
              name="city"
              placeholder="Town City"
              required
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              required
              max={6}
              maxLength={6}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />

            <div className="buttons">
              <button
                type="submit"
                className="success"
                onClick={(e) => {
                  activeTab === "packages" && handleFinalPackage(e);
                  activeTab !== "packages" && handleFinal(e);
                }}
              >
                Buy now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
