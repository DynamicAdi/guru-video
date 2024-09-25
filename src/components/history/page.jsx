import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { useLocation } from 'react-router-dom'
import axios from "axios"
import SmallLoader from '../../global/loader/SmallLoader';

function History({backend}) {
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
                    <h3>{values.changedAt.split("T")[0]}</h3>
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