import React, { useEffect, useState } from 'react'
import './login.scss';
import guru from '/logo.png'
import axios from 'axios';

function Login({backend}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleCalls = async () => {

        if (password.length >= 8 && email.length > 0) {
          setLoading(true)
            await axios.post(`${backend}/admins/new`, {
                name: name,
                email: email,
                password: password
            })
            setLoading(false);
            alert('Admin created successfully!')
        }
       else if (password.length < 8) {
        alert('Password must be at least 8 characters')
       }
        else {
        alert('Please enter both email and password')
       }
    }
  return (
    <div className='main'>
          <div className="container">
              <img src={guru} alt="user" />
<div className="upper">
    <p className="sign" align="center">Sign in</p>
    <p className="or" align="center">Please provide your credientials!</p>
</div>
    <form className="form1">
    <input required className="un " type="text" align="center" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input required className="un " type="email" align="center" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input required className="un" type="password" align="center" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>password must contain 8 letters</p>
      <a className="submit" align="center" onClick={() => handleCalls()}>{loading ? "Loading..." : "Sign in"}</a>
    </form>     
    </div>
    </div>
  )
}

export default Login