import React, { useEffect, useState } from 'react'
import Navbar from '../../global/navbar'
import './styles.scss';
import CorporateCard from './card';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function Corporate({backend, href}) {
  // const backend = 'http://localhost:8080'
  const [data, setData] = useState([]);
  const tabs = ["Basic", "Advanced", "Luxury"]
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true)
  // const [href, setHref] = useState('');

  // useEffect(() => {
  //   if (window.location.href.includes("/packages")) {
  //     setHref('packages')
  //   }
  //   if (window.location.href.includes("/corporate")) {
  //     setHref('CorporateList')
  //   }
  // }, []);

  const getFood = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/${href}`);
      setData(response.data);
      
      setLoading(false);
      if (activeTab) {
        setData(filterMenuItems(response.data))
        
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {    
    // setTimeout(() => {
      getFood();
    // }, 4000)
  }, [activeTab, href]);
  const filterMenuItems = (data) => {
    if(activeTab === "") return data;
    return data.filter(item => item.catogery === activeTab.toLocaleLowerCase());
  }




  return (
    <div className='CorporateMain'>
      <Navbar />
    <div className="up">
      <h1>Food Bundles</h1>
      <div className="tags">
      <div className="circleTags">
        <p>select preference</p>
        <div className="btns">
        {tabs.map((item, index) => (
          <button key={index} className={activeTab===item ? `active` : ""} onClick={() => setActiveTab(item)}>{item}</button>
        ))}
        </div>
      </div>
    </div>
    </div>
      <div className="middle">
      {loading ? (<SmallLoader />) : data.length === 0 ? <h1>No Items Found...☹️🥺</h1> :
      (data && data.map((item) =>    
     <CorporateCard key={item._id} 
      id={item._id}
      title={item.title}
      description={item.description}
      image={item.image}
      actualPrice={item?.actualPrice}
      discountedPrice={item?.discountedPrice}
      />     
      ))}


      </div>
    </div>
  )
}

export default Corporate