import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function CorporateCard({
  id,
  title,
  description,
  image,
  actualPrice,
  discountedPrice,
}) {
  return (
    <Link to={"/corporate/items"} state={{ id: id }}>
      <div className="coCard">
        <img src={image} alt={title} />
        <div className="blur">
          {/* <div className="pos" style={veg ? {borderColor: 'limegreen'} : {borderColor: 'brown'}}><div className="dot" style={veg ? {background: 'limegreen'} : {background: 'brown'}}></div></div> */}
          <h1>{title}</h1>
          <p>{description}</p>
          {discountedPrice && (
            <h3>
              ₹ {discountedPrice} <span>₹ {actualPrice}</span>
            </h3>
          )}
        </div>
        <Link to={"/corporate/checkout"} state={{ name: title }}>
          <button>Buy now</button>
        </Link>
      </div>
    </Link>
  );
}

export default CorporateCard;
