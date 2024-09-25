import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

function Admin({backend}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const [access, setAccess] = useState(
    localStorage.getItem("access") === "true"
  );
    // localStorage.getItem("access") === "true"
  const [error, setError] = useState(false);
  const [noDevice, setNoDevice] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 456) {
      setNoDevice(true);
    }
  }, []);

  const handleLogin = async () => {
     try {
      setLoading(true);
      const data = await axios.post(`${backend}/admins/login`, {
        email: email.toLowerCase(),
        password: password,
      });
      
      if (!data.data.success) {
        setError(true);
        setLoading(false);
        return;
      }
      
    if (data.data.success) {
      setAccess(true);
      localStorage.setItem("access", "true"); // Persist login state in localStorage
      setLoading(false);
      return;
    }
  }
  catch (error) {
    console.error(error);
  }
}

  const handleLogout = () => {
    setAccess(false);
    localStorage.removeItem("access"); // Remove access from localStorage on logout
  };

  return (
    <>
      {noDevice ? (
        <h1 style={{ color: "black", fontSize: "1.8rem" }}>
          Not supported on mobile devices...
        </h1>
      ) : access ? (
        <Dashboard logout={handleLogout} backend={backend} />
      ) : (
        <LoginForm
          email={email}
          password={password}
          error={error}
          setEmail={setEmail}
          setPassword={setPassword}
          setError={setError}
          login={handleLogin}
          loading={loading}
        />
      )}
    </>
  );
}

export default Admin;
