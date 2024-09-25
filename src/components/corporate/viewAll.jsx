import React, { useEffect, useState } from 'react'
import Navbar from '../../global/navbar'
import './view.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import DetailsCard from './DetailsCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function ViewAllItems({backend}) {
  const location = useLocation();
    const {id} = location.state;

    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backend}/corporateDetails/id=${id}`);
        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getDetails();
    }, [])


    const images = [
        {images: 'https://picsum.photos/1920'},
        {images: 'https://picsum.photos/1080'},
        {images: 'https://picsum.photos/900'},
        {images: 'https://picsum.photos/800'},
        {images: 'https://picsum.photos/700'},
        {images: 'https://picsum.photos/600'},
        {images: 'https://picsum.photos/200'},
    ]
    const [activeImage, setActiveImage] = useState(images[0].images);
    console.log(activeImage);
    

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true, 
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    isLoading ? (<SmallLoader />) :
    <div className='container'>
        <Navbar />
        {data && data.map((item) => (
        <div className="ViewDivider" key={item._id}>
            <div className="leftSide">
                <div className="image">
                    <img src={activeImage} alt="" />
                </div>
                <div className="row">
                <Slider {...settings}>
                    {images.map((image, index) => (
                    <div className="imgs" key={index} onClick={() => setActiveImage(image.images)}>
                    <img src={image.images} alt="" />
                    </div>
                    ))}
                </Slider>
                </div>

                <div className="itemsInList">
                    <h1>What's inside the box?</h1>

                    <div className="itemList">
                        <DetailsCard />
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="insider">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <h2>₹ {item.discountedPrice}/- <span>₹ {item.actualPrice}/-</span></h2>
                    <div className="tags">
                        <div className="tag">{item.items.length} Items</div>
                      {item.tags.map((item) => (
                        <div className="tag" key={item}>{item}</div>
                      ))}
                    </div>
                    <button>Buy now</button>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default ViewAllItems