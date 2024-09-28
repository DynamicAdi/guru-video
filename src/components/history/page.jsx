import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { useLocation } from 'react-router-dom'
import axios from "axios"
import SmallLoader from '../../global/loader/SmallLoader';

function History() {
    const backend = "http://localhost:8080"
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const location = useLocation()
    const {id} = location.state || ""

    const getHistory = async () => {
        try {

            setLoading(true)
            const response = await axios.get(`${backend}/statusHistory/${id}`)
            if (response.status === 200) {
                setData(response.data);
                console.log(response.data);
                
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHistory();
    }, [id])

    const formatDateToIST = (dateString) => {
        const date = new Date(dateString);
      
        const options = {
          timeZone: "Asia/Kolkata",
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
      
        return new Intl.DateTimeFormat('en-IN', options).format(date);
      };
      

      
  return (
    <div className='container'>
        <div className="glow btn" onClick={() => window.history.back()}>Back</div>
        
        <h1 style={{fontSize: '2.5rem'}}>Order <span style={{color: "orange"}}>Status</span> History</h1>
        
        <div className="hisChild">
            {loading ? <SmallLoader /> : data && data.map((item, index) => (
                <div className='flexi' key={index}>
                    {item.statusHistory.map((values) => (
                        <div className="boxy" key={index}>
                <div className="dot"></div>
                <div className="naming" key={values}>
                    <h2>{values.status}</h2>
                    <h3>{formatDateToIST(values.changedAt)}</h3>
                </div>
            </div>
            ))}
            </div>
        ))}
        </div>
    </div>
  )
}

export default History