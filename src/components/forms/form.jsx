import React, { useState } from 'react'
import './styles.scss'
import axios from 'axios';

function Form({backend}) {
  const [corporate, setCorporate] = useState({
    name: '',
    description: '', 
    image: [], 
    actualPrice: '', 
    discountedPrice: '', 
    isVeg: '', 
    tags: [], 
    items: [],
  })

    const addCorporate = async () => {
        try {
            const response = await axios.post(`${backend}/addCorporate`, {
              name: corporate.name,
              description: corporate.description,
              image: corporate.image,
              actualPrice: corporate.actualPrice,
              discountedPrice: corporate.discountedPrice,
              isVeg: corporate.isVeg,
              tags: corporate.tags,
              items: corporate.items
    
            })
          }
        catch (error) {
          console.error("Error:", error);
        }
      }
    
  return (
    <div className='main'>
        <h1>Add Corporate</h1>
        <div className="center">
            <form>
                <input type="text" placeholder='Title' onChange={(e) => setCorporate({...corporate, name: e.target.value})} />
                <input type="text" placeholder='Description' onChange={(e) => setCorporate({...corporate, description: e.target.value})}/>
                <input type="text" placeholder='Image' onChange={(e) => setCorporate({...corporate, image: e.target.value})}/>
                <input type="text" placeholder='Actual Price' onChange={(e) => setCorporate({...corporate, actualPrice: e.target.value})}/>
                <input type="text" placeholder='Discounted Price' onChange={(e) => setCorporate({...corporate, discountedPrice: e.target.value})}/>
                <select name="isVeg" onChange={(e) => setCorporate({...corporate, isVeg: e.target.value})}>
                    <option value="">Veg ?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <input type="text" placeholder='Tags' onChange={(e) => setCorporate({...corporate, tags: e.target.value})}/>
                <input type="text" placeholder='Items' onChange={(e) => setCorporate({...corporate, items: e.target.value})}/>
                <button className="glow">Add Corporate Box</button>
            </form>
        </div>
    </div>
  )
}

export default Form