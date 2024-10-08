import React from "react";
import food1 from "/assets/food 1.png";
import food2 from "/assets/food 8.png";
import food3 from "/assets/food 5.png";
import food4 from "/assets/food 4.png";
import { motion } from "framer-motion";

import './images.scss'

function Plates() {
  return (
    <>
      <motion.img
        initial={{ y: -500, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.6,
        }}
        viewport={{ once: false }}
        src={food1}
        alt=""
        className="img food1"
      />
      <motion.img
        initial={{ y: -500, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
        }}
        viewport={{ once: false }}
        src={food2}
        alt=""
        className="img food2"
      />
      <motion.img
        initial={{ y: -500, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 1,
        }}
        viewport={{ once: false }}
        src={food3}
        alt=""
        className="img food3"
      />
      <motion.img
        initial={{ y: -500, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 1.2,
        }}
        viewport={{ once: false }}
        src={food4}
        alt=""
        className="img food4"
      />
    </>
  );
}

export default Plates;
