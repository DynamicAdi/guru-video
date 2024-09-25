import React, { useEffect, useState } from 'react'
import Navbar from '../../global/navbar'
import './styles.scss';
import CorporateCard from './card';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function Corporate({backend}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [FoodPrefrence, setFoodPrefrence] = useState('');
  const getFood = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/CorporateList`);
      setData(response.data);
      setLoading(false);
      if (FoodPrefrence !== "") {
        setData(filterMenuItems(data));
      setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getFood();
  }, [FoodPrefrence]);

  const filterMenuItems = (items) => {
    if (FoodPrefrence === "veg") {
      return items.filter((item) => item.isVeg);
    }
    if (FoodPrefrence === "non-veg") {
      return items.filter((item) => !item.isVeg);
    }
    return items;
  };


  return (
    <div className='CorporateMain'>
      <Navbar />
    <div className="up">
      <h1>Food Bundles</h1>
      <div className="tags">
      <div className="circleTags">
        <p>select preference</p>
        <div className="btns">
        <button>High</button>
        <button>Medium</button>
        <button>Low</button>
        </div>

      </div>
       
       <div className="context">
        <p>Food preference</p>
       <select className='tag'
        defaultValue={"both"}
        onChange={(e) => setFoodPrefrence(e.target.value)}
       >
        <option value="">Both</option>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-veg</option>
       </select>
       </div>
    </div>
    </div>
      <div className="middle">
      {loading ? (<SmallLoader />) : (data && data.map((item) =>    
      <CorporateCard key={item._id} 
      id={item._id}
      title={item.title}
      description={item.description}
      image={item.image}
      actualPrice={item.actualPrice}
      discountedPrice={item.discountedPrice}
      isVeg={item.isVeg}
      />
      ))}


      </div>
    </div>
  )
}

export default Corporate