import React from 'react'
import './table.scss';

function Table({data}) {
  return (
    
	<div className="table">
    <div className="tableHeader">
        {/* <div className="headerItem">Image</div> */}
        <div className="headerItem">Name</div>
        <div className="headerItem">Description</div>
        <div className="headerItem">Price</div>
        
    </div>
    <div className="tableContent">	
            {data.map((item, i) =>(
        <div className="tableRow">	
            {/* <div className="img">
                <img src={item.image} alt={item.name} />
            </div> */}
            <div className="tableData">{item.name}</div>
            <div className="tableData">{item.description}</div>
            <div className="tableData">{item.price} /-</div>
            {/* <div className="tableData">1</div> */}
        </div>
            ))}	
    </div>	

    {/* <div className="tableContent">	 */}
        <div className="tableRow last">		
            <div className="">Total no of items: {data.length}</div>
            <div className="">Total price: {data.reduce((sum, item) => sum + item.price, 0)} /-</div>
        {/* </div> */}
    </div>
</div>

  )
}

export default Table