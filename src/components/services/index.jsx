import React, { useEffect, useState } from 'react'
import "./styles.scss";
import ServeCard from './card';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function Services({backend}) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Fetch data from API
  const getServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/Services`);
      setData(response.data);
      setLoading(false);
    }
    catch {
      console.error('Failed to fetch data');
      setLoading(false);
    }
  }

  useEffect(() => {
    getServices();
  }, []);
  return (
    <div className='servCont' id='services'>
        <h3>We are more than just a caterer </h3>
        <h1>We create <span>exceptional</span> experiences</h1>
        <div className="cardMiddle">
         {loading ? <SmallLoader /> :  data && data.map((items, index) => (
        <ServeCard img={items.image} name={items.name} key={index} />
          ))}
        </div>
    </div>
  )
}

export default Services