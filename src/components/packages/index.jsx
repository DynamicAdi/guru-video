import React, { useEffect, useState } from 'react';
import "./styles.scss";
import Card from './card';
import SmallLoader from '../../global/loader/SmallLoader';
import Slider from 'react-slick';
import axios from 'axios'

function Packages({backend}) {
  
  const tabs = ['Basic', 'Advanced', 'Luxury'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [loading, setloading] = useState(false);
    const [data, setData] = useState([]);


  const getData = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${backend}/packages`);
      if (response.status === 200) {
        setData(filterMenuItems(response.data));
        setloading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [activeTab]);
  const filterMenuItems = (data) => {
    if(activeTab === "") return data;
    return data.filter(item => item.catogery === activeTab.toLocaleLowerCase());
  }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        speed: 3000,
        pauseOnHover: true,
        autoplaySpeed: 3000,
        lazyLoad: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }

      
  return (
    <div className='pkg' id='packages'>
    {/* <h1>Packages</h1> */}
        <div className="child">
        <div className="block">
            <h2><span>
                {activeTab === "Basic" && "Basic"}
                {activeTab === "Advanced" && "Advanced"}
                {activeTab === "Luxury" && "Luxury"}

                </span> packages</h2>
            <div className="boxes">

            {
            loading ? <SmallLoader /> : data.length === 0 ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%'}}><h1 style={{textAlign: 'center'}}>No Items Found! 🥺☹️</h1></div> : data.length > 0 &&  
            (
          <Slider arrows={false} {...settings}>
            {
              data.map((content, index) => (
                <Card key={content._id} id={content._id} title={content.title} desc={content.description} image={content.image} />
              )) 
            }
          </Slider>
            )
            }
            {/* <Card /> */}

            </div>
            <div className="ratio">
                {
                    tabs.map((tab, index) => (
                        <div key={index} className={`tab ${activeTab === tab? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
    </div>
  )
}

export default Packages