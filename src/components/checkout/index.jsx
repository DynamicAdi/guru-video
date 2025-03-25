import React, { useEffect } from "react";
import "./styles.scss";
import { BiParty, BiUser, BiCheckDouble } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/image.jpg";

function Checkout({ backend }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, prefrence } = location.state || [];
  const functionTabs = [
    "Wedding",
    "Anniversary",
    "engagement",
    "birthday",
    "corporate",
    "others",
  ];
  const noOfPeoples = ["2-20", "20-50", "50-100", "100-500", "500+"];
  const [foodPrefrence, setPrefrence] = useState(prefrence);
  const [functionDetails, setDetails] = useState({
    functionType: "",
    noOfPeoples: "",
    prefrence: foodPrefrence,
    yourNote: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    address: "",
  });

  const [stepForm, setStepForm] = useState(1);
  const [address, setAddress] = useState({
    area: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const [windowSize, setWindows] = useState(false);

  let finalAddress =
    address.area +
    ", " +
    address.landmark +
    ", " +
    address.city +
    ", " +
    address.pincode;
  // console.log(finalAddress);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setWindows(true);
    }
  }, [window.innerWidth]);

  const uploadData = async () => {
    try {
      const data = await axios.post(`${backend}/addOrder`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        address: finalAddress,
        note: functionDetails.yourNote,
        functionType: functionDetails.functionType,
        noOfPeople: functionDetails.noOfPeoples,
        foodPreference: functionDetails.prefrence,
        items: items,
      });
      const email = await axios.post(`${backend}/contactCorporate`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: "Order Confirmation - Guru's Caterers",
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
      if (data.status === 200 && email.status === 200) {
        localStorage.clear();
        navigate("/checkout/thanks");
      }
    } catch (error) {
      console.error("Failed to upload data", error);
    }
  };

  const handleNext = () => {
    if (functionDetails.functionType === "") {
      alert("Please select function type");
      return null;
    }
    if (functionDetails.noOfPeoples === "") {
      alert("Please select no. of people");
      return null;
    }
    if (functionDetails.prefrence === "") {
      alert("Please choose prefrence");
      return null;
    }
    setStepForm(2);
  };
  const handleFinal = () => {
    setFormData((prevDetails) => ({
      ...prevDetails,
      address: finalAddress,
    }));
    if (formData.name === "") {
      alert("Please enter name");
      return null;
    }
    if (formData.phone === "") {
      alert("Please enter phone number");
      return null;
    }
    if (formData.phone.length < 10 || formData.phone.length > 10) {
      alert("Please enter valid phone number");
      return null;
    }
    if (formData.email === "") {
      alert("Please enter email");
      return null;
    }
    if (formData.date === "") {
      alert("Please enter date");
      return null;
    }
    if (finalAddress === "") {
      alert("Please enter address");
      return null;
    }
    setStepForm(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update only the specific field that is changed
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    // Update only the specific field that is changed
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const goBack = () => {
    if (stepForm === 2) {
      setStepForm(1);
    } else if (stepForm === 3) {
      setStepForm(2);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="main">
      <div className="backme" onClick={() => navigate("/menu")}>
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
            <div
              className={`box ${stepForm === 1 ? "active" : ""} ${
                stepForm === 2 || 3 ? "done" : ""
              }`}
            >
              <div
                className={`circle ${stepForm === 1 ? "active" : ""} ${
                  stepForm === 2 || 3 ? "done" : ""
                }`}
              >
                <BiParty size={25} />
              </div>
              <p>Function Details</p>
            </div>
            <div
              className={`box ${stepForm === 2 ? "active" : ""} ${
                stepForm === 3 ? "done" : ""
              }`}
            >
              <div
                className={`circle ${stepForm === 2 ? "active" : ""} ${
                  stepForm === 3 ? "done" : ""
                }`}
              >
                <BiUser size={25} />
              </div>
              <p>User Info</p>
            </div>
            <div
              className={`box ${stepForm === 3 ? "active" : ""} ${
                stepForm === 3 ? "done" : ""
              }`}
            >
              <div
                className={`circle ${stepForm === 3 ? "active" : ""} ${
                  stepForm === 3 ? "done" : ""
                }`}
              >
                <BiCheckDouble size={25} />
              </div>
              <p>Check Details</p>
            </div>
          </div>

          <form className="form" style={{ gap: "0.5rem" }}>
            {stepForm === 1 && (
              <>
                <select
                  onChange={(e) =>
                    setDetails({
                      ...functionDetails,
                      functionType: e.target.value,
                    })
                  }
                >
                  <option value="">Function Type</option>
                  {functionTabs.map((tab, index) => (
                    <option key={index} value={tab}>
                      {tab}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) =>
                    setDetails({
                      ...functionDetails,
                      noOfPeoples: e.target.value,
                    })
                  }
                >
                  <option value={noOfPeoples}>No. of People</option>
                  {noOfPeoples.map((tab, index) => (
                    <option key={index} value={tab}>
                      {tab}
                    </option>
                  ))}
                </select>
                <div className="input">
                  <h2>Food prefrence</h2>
                  <div className="selector">
                    <div
                      className={`selectPref ${
                        foodPrefrence === "veg" ? "active" : ""
                      }`}
                      onClick={() => setPrefrence("veg")}
                    >
                      Veg
                    </div>
                    <div
                      className={`selectPref ${
                        foodPrefrence === "non-veg" ? "active" : ""
                      }`}
                      onClick={() => setPrefrence("non-veg")}
                    >
                      Non Veg
                    </div>
                    <div
                      className={`selectPref ${
                        foodPrefrence === "both" ? "active" : ""
                      }`}
                      onClick={() => setPrefrence("both")}
                    >
                      Both
                    </div>
                  </div>
                </div>
                {/* <h3>Your note</h3> */}
                <textarea
                  name="node"
                  placeholder="Your note"
                  onChange={(e) =>
                    setDetails({ ...functionDetails, yourNote: e.target.value })
                  }
                ></textarea>
                <div className="buttons">
                  <button
                    onClick={(e) => {
                      handleNext(), e.preventDefault();
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {stepForm === 2 && (
              <>
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
                  max={10}
                  maxLength={10}
                  placeholder="987654xxxxxx"
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
                  onChange={(e) =>
                    setAddress({ ...address, area: e.target.value })
                  }
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
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
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
                    style={{
                      backgroundColor: "#ff5555",
                      boxShadow: "6px 8px 20px #ff555580",
                    }}
                    onClick={(e) => {
                      goBack(), e.preventDefault();
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="success"
                    onClick={(e) => {
                      handleFinal(), e.preventDefault();
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {stepForm === 3 && (
              <>
                {Object.keys(functionDetails).map((key) => (
                  <div key={key} style={{ width: "100%" }}>
                    <input
                      type="text"
                      name={key} // Use key as the name
                      value={functionDetails[key]} // Set value to corresponding state value
                      onChange={handleInputChange} // Handle changes
                      placeholder={functionDetails[key]} // Set placeholder
                    />
                  </div>
                ))}

                {Object.keys(formData).map((key) => (
                  <div key={key} style={{ width: "100%" }}>
                    <input
                      type="text"
                      name={key} // Use key as the name
                      value={formData[key]} // Set value to corresponding state value
                      onChange={handleFormInputChange} // Handle changes
                      placeholder={formData[key]} // Set placeholder
                    />
                  </div>
                ))}
                <div className="buttons">
                <button
                  type="submit"
                  className="success"
                  style={{
                    backgroundColor: "#ff5555",
                    boxShadow: "6px 8px 20px #ff555580",
                  }}
                  onClick={(e) => {
                    goBack(), e.preventDefault();
                  }}
                >
                  Back
                </button>
                  <button
                    type="submit"
                    className="success"
                    onClick={(e) => {
                      uploadData(), e.preventDefault();
                    }}
                  >
                    Place Order
                  </button>
                </div>
          {/* </div> */}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
