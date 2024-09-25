import React, { useEffect, useState } from "react";
// import styles from './styles.module.scss'
import axios from 'axios';
import "./styles.scss";
import ColorCard from "./card";
import Slider from "react-slick";
import SmallLoader from "../../global/loader/SmallLoader";

function PopularItems({backend}) {
  // console.log(backend);
  // backend = 'http://localhost:8080'
  
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Example breakpoint
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleFetch = async function () {
    setLoading(true);
    const response = await axios.get(`${backend}/popular`);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
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
    <div className="popularItems" id="popular">
      <div className={"upper"}>
        <h2>
          Popular <span>Items</span>
        </h2>
      </div>
      <div className="child">
        <div className="popCards"
        >
          <Slider arrows={false} {...settings}>
          {loading ? (<SmallLoader />) : (
            data.length > 0 && 
            data.
            slice(0, 5).map((card, index) => (
              <ColorCard currentCard={currentCard} index={index} key={index} id={card?._id} image={card?.image} name={card?.name} desc={card?.description} isVeg={card?.isVeg} />
            ) 
          ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default PopularItems;
