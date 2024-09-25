import React, { useEffect } from "react";
import "./styles.scss";
import { BiParty, BiUser, BiCheckDouble } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function Checkout({backend}) {
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

  const [windowSize, setWindows] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setWindows(true);
    }
  }, [window.innerWidth])


  const uploadData = async () => {
    try {
      const data = await axios.post(`${backend}/addOrder`, {
        
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        address: formData.address,
        note: functionDetails.yourNote,
        functionType: functionDetails.functionType,
        noOfPeople: functionDetails.noOfPeoples,
        foodPreference: functionDetails.prefrence,
        items: items,
      });

      console.log(data);
      if (data.status === 200) {
        alert("Order Placed Successfully!");
        navigate("/");
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
    if (formData.address === "") {
      alert("Please enter address");
      return null;
    }
    setStepForm(3);
    console.log(fullDetails);
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

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="main">
      <div className="backme" onClick={() => navigate('/menu')}>Back</div>
      <div className="child">
        <div className="image" style={windowSize ? {display: 'none'} : {display: 'block'}}>
          <img src="https://picsum.photos/1820" alt="alt from" />
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

          <form className="form">
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
                  placeholder="+91-987654xxxxxx"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value.replace(/[^\d]/g, "").slice(0, 10) })
                  }
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="xyz@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value.replace(/\s+/g, "")})
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
                <textarea
                  name="address"
                  required
                  placeholder="123, ABC Street"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                ></textarea>

                <div className="buttons">
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
                    onClick={(e) => {
                    uploadData(),
                    e.preventDefault();
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
