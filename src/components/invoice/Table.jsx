import React from 'react'
import './table.scss';

function Table({data, noOfPeople}) {
  return (
    
	<div className="table">
    <div className="tableHeader">
        {/* <div className="headerItem">Image</div> */}
        <div className="headerItem">Name</div>
        <div className="headerItem">Cateogry</div>
        <div className="headerItem">No of peoples</div>
        
    </div>
    <div className="tableContent">	
            {data.map((item, i) =>(
        <div className="tableRow" key={i}>	
            {/* <div className="img">
                <img src={item.image} alt={item.name} />
            </div> */}
            <div className="tableData">{item.name}</div>
            <div className="tableData">{item.catogery}</div>
            <div className="tableData">{noOfPeople}</div>
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