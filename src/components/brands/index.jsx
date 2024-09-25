import React, { useEffect, useState } from "react";
import "./styles.scss";
import Slider from "react-slick";
import axios from 'axios';
import SmallLoader from "../../global/loader/SmallLoader";

function Brands({backend}) {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(`${backend}/Clients`);
    if (response.status === 200) {
      setData(response.data);
      setLoading(false)
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 1400,
    pauseOnHover: true,
    autoplaySpeed: 1400,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="tableOfCustomers">
      <h1>
        Join the table with <span>satasfied</span> customers
      </h1>
      <div className="middleNames">
      {loading ? <SmallLoader /> : 
        <Slider {...settings}>
          {data && data.map((items, index) => (
            <div className="imgContainer" key={index}>
              <img src={items.image} alt={items?.name || "Our partner"} />
            </div>
          ))}
        </Slider>
        }
      </div>
    </div>
  );
}

export default Brands;
