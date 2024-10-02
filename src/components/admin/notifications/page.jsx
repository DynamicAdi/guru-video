import React, { useEffect, useState } from 'react'
import { askForPermission } from '../../../funcs/firebase';
import axios from 'axios';
import '../login.scss';
import guru from "/logo.png";


function Notifications({backend}) {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // const backend = 'http://localhost:8080'

    const getPermissions = async () => {
        const permission = await askForPermission();
        if (permission !== undefined) {
            setToken(permission);
        }
    }

    useEffect(() => {
        getPermissions()
    }, [])
    
    const pushToken = async () => {
        if (token !== null) {
            setLoading(true);
            const response = await axios.post(`${backend}/admins/token`, {
                email: email,
                password: password,
                token: token,       
            })
            if (response.status === 200) {
                console.log("Token saved successfully:", response.data.message);
                setLoading(false);
            } else {
                console.log("Error saving token:", response.data.message);
                setLoading(false);

            }
        }
        }

  return (
    <div className="main">
    <div className="container">
    <img src={guru} alt="user" />
    <div className="upper">
      <p className="sign" align="center">
        Welcome back!
      </p>
      <p className="or" align="center">
        Please provide your credientials.
      </p>
    </div>
    <form className="form1">
      <input
        required
        className="un "
        type="email"
        align="center"
        placeholder="Email *"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value), error && setError(false);
        }}
      />
      <input
        required
        className="un"
        type="password"
        align="center"
        placeholder="Password *"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value), error && setError(false);
        }}
      />
      <p
        className={error ? "error" : ""}
        style={{ top: "135%", left: "23%" }}
      >
        Please check your credientials properly!!
      </p>
      <a
        className={`${loading ? "submit notAllowed" : "submit"}`}
        align="center"
        onClick={loading ? () => {} : async () => await pushToken()}
      >
        {loading ? "Loading" : "Enable Notifications"}
      </a>
    </form>
  </div>
  </div>
  )
}

export default Notifications