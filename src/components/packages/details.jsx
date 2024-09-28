import React, { useEffect, useState } from 'react'
import Navbar from '../../global/navbar'
import './details.scss'


import DetailsCard from '../corporate/DetailsCard';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function PackageDetails({backend}) {
  const location = useLocation();
    const {id} = location.state;

    const activeTab = 'packages'
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    const getDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backend}/packagesDetails/id=${id}`);
        const boxes = await axios.get(`${backend}/packageItems/id=${id}`);

        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        }

        if (boxes.status === 200) {
          setItems(boxes.data);
          setIsLoading(false);       
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    
    const [activeImage, setActiveImage] = useState(!isLoading ? data[0].image[0] : "");

    useEffect(() => {
      getDetails();      
      }, [])
      
      useEffect(() => {
        if(data.length > 0)  {// only set activeImage when data is loaded and available
        setActiveImage(data[0].image[0]);
        }
    }, [data])




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
    <div className='dabba'>
        <Navbar />
        {data && data.map((item) => (
        <div className="ViewDivider" key={item._id}>
            <div className="leftSide">
                <div className="image">
                    <img src={activeImage} alt="" />
                </div>
                <div className="row">
                    {item.image.map((image, index) => (
                    <div className="imgs" key={index} onClick={() => setActiveImage(image)}>
                    <img src={image} alt="" />
                    </div>
                    ))}
                </div>



                <div className="itemsInList">
                    <h1>What's inside the box?</h1>

                    <div className="itemList">
                      {
                        isLoading ? <SmallLoader /> : items.length === 0 ? <h1>No Items Found</h1> : items.length > 0 ? items.map((data) => (
                          <DetailsCard title={data.name} image={data.image} desc={data.description} id={data.id} isVeg={data.isVeg}/>
                        ))
                         : ""
                      }
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="insider">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <div className="tags">
                        <div className="tag">{item.items.length} Items</div>
                      {item.tags.map((item) => (
                        <div className="tag" key={item}>{item}</div>
                      ))}
                    </div>
                  <Link to={"/packages/checkout"} state={{name: item.title, activeTab: activeTab}}> 
                    <button>Buy now</button>
                  </Link>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default PackageDetails