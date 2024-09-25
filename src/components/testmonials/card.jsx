import React from "react";
import "./styles.scss";
import { RiDoubleQuotesL } from "react-icons/ri";

function TestmonialsCard({ index }) {
  return (
    <div className={`TestmonialsCard ${index % 2 === 0 ? "yellow" : ""}`}>
      <div className="upper">
        <div className="avatar">
          <img src="https://picsum.photos/200" alt="" />
        </div>
        <div className="textTestmonials">
          <h1>Adarsh pandit</h1>
          <p className="sub">Ui / UX Designer</p>
        </div>
      </div>

      <div className="lower">
        <RiDoubleQuotesL size={50} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, voluptate.{" "}
        </p>
      </div>
    </div>
  );
}

export default TestmonialsCard;
