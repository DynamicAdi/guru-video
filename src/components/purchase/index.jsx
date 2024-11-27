import React, { useEffect, useState } from 'react'
import "./styles.scss";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function BuyNow({url}) {
    const location = useLocation()
    const {name, activeTab} = location.state || '';
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
    
      const [windowSize, setWindows] = useState(false);

      useEffect(() => {
        if (window.innerWidth < 900) {
          setWindows(true);
        }
      }, [window.innerWidth])
    
    const handleFinal = async (e) => {
      e.preventDefault()
        try {
            setLoading(true);
            const response = await axios.post(`${url}/orderCorporate`, {
                itemName: formData.itemName,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                date: formData.date,
                address: formData.address,
            })
            const email = await axios.post(`${url}/contactCorporate`, {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              subject: "New Order",
              message: `New order has been placed for ${formData.itemName}. Please review and confirm the details below: \n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDate: ${formData.date}\nAddress: ${formData.address}\n\nThank you for your order!`
          })
            if (response.status === 200 && email.status === 200) {
                setLoading(false);
                window.location.replace("/corporate/thanks")
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
      };  

    const handleFinalPackage = async (e) => {
      e.preventDefault()
        try {
            setLoading(true);
            const response = await axios.post(`${url}/orderpackages`, {
                itemName: formData.itemName,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                date: formData.date,
                address: formData.address,
                customize: formData.customize,
            })
            const email = await axios.post(`${url}/contactCorporate`, {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              subject: "New Order",
              message: `New order has been placed for ${formData.itemName}. Please review and confirm the details below: \n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDate: ${formData.date}\nAddress: ${formData.address}\n\nThank you for your order!`
          })
            if (response.status === 200 && email.status === 200) {
                setLoading(false);
                window.location.replace("/corporate/thanks");
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="main">
    <div className="backme" onClick={() => window.history.back()}>Back</div>
    <div className="child">
      <div className="image" style={windowSize ? {display: 'none'} : {display: 'block'}}>
        <img src="https://picsum.photos/1820" alt="alt from" />
      </div>
      <div className="content">
        <div className="uperWala">
            <h1>Checkout</h1>
        </div>
        <form className="form">
        <input
                type="text"
                name="name"
                required
                placeholder={`${name}`}
                readOnly
                style={{cursor: 'not-allowed'}}
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
            {
              activeTab === 'packages' && (
                <select 
                required
                name="customize"
                onChange={(e) =>
                  setFormData({...formData, customize: e.target.value === 'true' })
                }
                >
                  <option>Do you want to customize menu?</option>
                  <option value={false}>No, I don't want any customization</option>
                  <option value={true}>Yes, I want to Customize</option>
                </select>
              )
            }
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
                    activeTab === 'packages' && handleFinalPackage(e)
                    activeTab!== 'packages' && handleFinal(e)
                  }}
                >
                  Buy now
                </button>
              </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default BuyNow