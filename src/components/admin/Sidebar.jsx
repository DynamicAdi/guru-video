import React, { useState } from 'react'
import "./sidebar.scss"
import { RiAdminLine } from 'react-icons/ri'
import axios from "axios";
import {
  CiCircleList,
  CiCircleQuestion,
  CiShoppingBasket,
  CiUser,
} from "react-icons/ci";
import { PiBag, PiBasketLight } from "react-icons/pi";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { LuPackagePlus } from "react-icons/lu";
import { BiCategoryAlt } from "react-icons/bi";
import { IoFastFoodOutline, IoLogOutOutline } from 'react-icons/io5';

function Sidebar({tabs, activeTab, setActiveTab}) {
  return (
    <div className='sidepannel'>
        <div className="children">
            {tabs.map((tab, i) => {
                return (
        <div className={`toolbox ${activeTab === tab.title && "active"}`} onClick={() => setActiveTab(tab.title)}>
                <span><tab.icon /></span> <p>{tab.title}</p>
            </div>
                )
            })}
            <div className="bottom">
              <div className="logout">
                <button 
                // onClick={() => logout()}
                >
                  <IoLogOutOutline style={{ transform: "rotate(180deg)" }} />{" "}
                  Logout
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar