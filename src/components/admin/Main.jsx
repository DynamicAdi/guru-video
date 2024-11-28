import React, { useEffect, useState } from 'react'
import "./main.scss";
import logo from "/logo.png";
import Sidebar from './Sidebar';
import Table from './screen';
import { readData } from '../../funcs/useFetch';

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

function MainAdminDashboard({backend}) {
    const tabs = [
        { title: "Admins", icon: RiAdminLine },
        { title: "Foods", icon: IoFastFoodOutline },
        { title: "Category", icon: BiCategoryAlt },
        { title: "Orders", icon: PiBag },
        { title: "Corporate orders", icon: PiBasketLight },
        { title: "Packages orders", icon: LuPackagePlus },
        { title: "Corporate", icon: GiHotMeal },
        { title: "Packages", icon: CiShoppingBasket },
        { title: "Clients", icon: CiUser },
        { title: "Services", icon: CiCircleList },
        { title: "Faq", icon: CiCircleQuestion },
      ];
      const [activeTab, setActiveTab] = useState(tabs[3].title);
      const { data = [], isLoading, error, reFetch } = readData(backend, activeTab);
      const [loading, setLoading] = useState(false);
      const [visible, setVisible] = useState(false);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [price, setPrice] = useState("");
      const [isVeg, setIsVeg] = useState();
      const [isPopular, setIsPoupular] = useState();
      const [description, setDescription] = useState("");
      const [catogery, setCatogery] = useState("");
      const [catogeries, setCatogeries] = useState([]);
      const [createCatogery, setCreateCatogery] = useState(false);
    
    
      const [admin, setAdmin] = useState(false);
      const [role, setRole] = useState("admin");
    
      const [image, setImage] = useState("");
      const [uploadProgress, setUploadProgress] = useState(false);
    
      const [selectedStatus, setSelectedStatus] = useState("");
      const [status, setStatus] = useState(false);
    
      const options = [
        "ordered",
        "contact",
        "Approved",
        "Not Approved",
        "Payment collected",
        "completed",
      ];
    
      const handleStatusChange = async (e, id) => {
        const newStatus = e.target.value;
    
        setSelectedStatus((prevStatus) => ({
          ...prevStatus,
          [id]: newStatus,
        }));
    
        setSelectedStatus(newStatus);
        await axios.put(`${backend}/status`, {
          id: id,
          status: newStatus,
        });
      };
    
      const corporateStatusChange = async (e, id) => {
        const newStatus = e.target.value;
    
        setSelectedStatus((prevStatus) => ({
          ...prevStatus,
          [id]: newStatus,
        }));
    
        setSelectedStatus(newStatus);
        await axios.put(`${backend}/changeStatus`, {
          id: id,
          status: newStatus,
        });
      };
    
      const packagesStatusChange = async (e, id) => {
        const newStatus = e.target.value;
    
        setSelectedStatus((prevStatus) => ({
          ...prevStatus,
          [id]: newStatus,
        }));
    
        setSelectedStatus(newStatus);
        await axios.put(`${backend}/changepackagesStatus`, {
          id: id,
          status: newStatus,
        });
      };
    
      const getStatus = async (route) => {
        try {
          setLoading(true);
          const response = await axios.get(`${backend}/${route}`);
          const data = response.data;
          const initialStatus = {};
          data.forEach((product) => {
            initialStatus[product._id] = product.status;
          });
          setSelectedStatus(initialStatus);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };
    
    
      useEffect(() => {
        activeTab === "Orders" ? getStatus("getStatus") : setLoading(false);
      }, [activeTab, handleStatusChange]);
    
      useEffect(() => {
        activeTab === "Corporate orders" ? getStatus("corporateStatus") : setLoading(false);
      }, [activeTab, corporateStatusChange]);
    
      useEffect(() => {
        activeTab === "Packages orders" ? getStatus("packagesStatus") : setLoading(false);
      }, [activeTab, packagesStatusChange]);
    
      const [create, setCreate] = useState(false);
      const [id, setId] = useState("");
      const [update, setUpdate] = useState(false);
    
      const keys =
        data && data.length > 0
          ? Object.keys(data[0]).filter(
              (key) =>
                key !== "_id" &&
                key !== "__v" &&
                key !== "orders" &&
                key !== "status" &&
                key !== "firebaseToken"
            )
          : [];
    
      useEffect(() => {
        reFetch();
      }, [activeTab]);
    
      const handleEdit = async (action, id) => {
        let url = `${backend}/search`;
        let METHOD = "POST";
        try {
          setLoading(true);
          if (action === "delete") {
            url = `${backend}/delete`;
          }
          if (action === "edit") {
            url = `${backend}/search`;
          }
          if (action === "update") {
            url = `${backend}/update`;
            METHOD = "PUT";
          }
          if (activeTab === "Foods") {
            getCatogery("read");
          }
    
          const response = await axios.request({
            method: METHOD,
            url: url,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              endpoint: activeTab,
              id: id,
              data: {
                name: name,
                price: price,
                isVeg: isVeg,
                isPopular: isPopular,
                image: image,
                catogery: catogery,
                description: description,
              },
            },
          });
    
          setName(response.data.name);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setPrice(response.data.price);
          setIsVeg(response.data.isVeg);
          setIsPoupular(response.data.isPopular);
          setImage(response.data.image);
          setDescription(response.data.description);
          setCatogery(response.data.catogery);
          setLoading(false);
          // createCatogery(true)
          // setVisible(true)
          if (action === "delete") {
            reFetch();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const handleUpdate = async (id, e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const response = await axios.put(`${backend}/update`, {
            id: id,
            name: name,
            description: description,
            price: price,
            image: image,
            isVeg: isVeg,
            catogery: catogery,
            isPopular: isPopular,
          });
          console.log("Item updated:", response.data);
          setVisible(false);
          setUpdate(false);
          setLoading(false);
          reFetch();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      };
    
      const handleUserUpdate = async (id) => {
        const response = await axios.put(`${backend}/users/update`, {
          id: id,
          name: name,
          email: email,
          password: password,
        });
        console.log("User updated:", response.data);
        setVisible(false);
      };
    
      const nayaCatogery = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await axios.post(`${backend}/category/create`, {
            name: catogery,
            image: image,
          });
          setLoading(false);
          setVisible(false);
          setCreateCatogery(false);
          alert(catogery + ": created successfully");
          reFetch();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      };
      const getCatogery = async (action, id) => {
        let url = "";
        let method = "GET";
        if (action === "read") {
          (url = `${backend}/category`), (method = "GET");
        } else if (action === "create") {
          (url = `${backend}/category/create`), (method = "POST");
        } else if (action === "delete") {
          url = `${backend}/category/delete`;
          method = "DELETE";
        } else if (action === "update") {
          (url = `${backend}/category/update`), (method = "PUT");
        }
    
        const options = {
          method: method,
          url: url,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id: id,
            image: image,
            name: catogery,
          },
        };
        setLoading(true);
        // if (id==="" || catogery === "" || image === "") {
        //   alert("Please fill all the details")
        //   return null
        // }
        const response = await axios.request(options);
        setCatogeries(response.data);
        setLoading(false);
      };
    
      const handleCreate = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const response = await axios.post(`${backend}/createFood`, {
            name: name,
            description: description,
            price: price,
            image: image,
            isVeg: isVeg,
            catogery: catogery,
            isPopular: isPopular,
          });
          console.log("Item created:", response.data);
          setLoading(false);
          setVisible(false);
          setCreate(false);
          reFetch();
        } catch (error) {
          console.error("Error creating item:", error);
        }
      };
    
      const UploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unsigned_preset");
    
        try {
          setUploadProgress(true);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dozknak00/image/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
              },
            }
          );
          setImage(response.data.secure_url);
          setUploadProgress(false);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

  return (
    <div className='screen'>
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
        </div>
        <div className="child">
            <div className="sidebar">
                <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} 
                
                
                />
            </div>
            <div className="content">
                <Table columns={keys} data={data} activeTab={activeTab} handleEdit={handleEdit}/>
            </div>
        </div>
    </div>
  )
}

export default MainAdminDashboard