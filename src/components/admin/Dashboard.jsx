import { useEffect, useState } from "react";
import "./dashboard.scss";
import { RiAdminLine } from "react-icons/ri";
import {
  IoFastFoodOutline,
  IoLogOutOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { readData } from "../../funcs/useFetch";

import { FaRegEdit, FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import {
  CiCircleList,
  CiCircleQuestion,
  CiShoppingBasket,
  CiUser,
} from "react-icons/ci";
import axios from "axios";
import { PiBag, PiBasketLight } from "react-icons/pi";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { LuPackagePlus } from "react-icons/lu";
import { BiCategoryAlt } from "react-icons/bi";
import SmallLoader from "../../global/loader/SmallLoader";
import { askForPermission } from "../../funcs/firebase";
// import {requestForToken} from "../../funcs/firebase.js"

function Dashboard({ logout, backend }) {
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
    <>
      {activeTab === "Clients" ||
      activeTab === "Faq" ||
      activeTab === "Services" ? (
        <div className="upper">
          <div className="btns">
            <Link to={"/dashboard/add/form"} state={{ tab: activeTab }}>
              <button>Add Data</button>
            </Link>
          </div>
        </div>
      ) : activeTab === "Corporate" || activeTab === "Packages" ? (
        <div className="upper">
          <div className="btns">
            <Link to={"/dashboard/corporate"} state={{ tab: activeTab }}>
              <button>Add Data</button>
            </Link>
          </div>
        </div>
      ) : activeTab === "Foods" ? (
        <div className="upper">
          <div className="btns">
            <button
              className="btn"
              onClick={() => {
                setCreate(true), getCatogery("read");
              }}
            >
              Add Food +
            </button>
            <button
              className="btn catogery"
              onClick={() => {
                setCreateCatogery(true);
              }}
            >
              Add Catogery +
            </button>
          </div>
        </div>
      ) : null}
      <div
        className="container"
        style={
          activeTab === "Admins" || activeTab === "Orders"
            ? { marginTop: "2%" }
            : { marginTop: "0%" }
        }
      >
        {createCatogery ? (
          <div className="visible userEd create">
            <h1>
              Create Catogery{" "}
              <IoCloseOutline
                className="icons"
                onClick={() => {
                  setVisible(false), setCreateCatogery(false);
                }}
              />
            </h1>
            <form className="form">
              {image !== "" ? (
                <div className="imgCont">
                  {create ? (
                    <h3>Image uploaded Successfully!!</h3>
                  ) : (
                    <input
                      onChange={UploadImage}
                      style={{ width: "60%", height: "6rem" }}
                      accept="image/*"
                      type="file"
                    />
                  )}
                  <img src={image} alt="uploaded" className="uploadedImage" />
                </div>
              ) : (
                <input
                  required
                  onChange={UploadImage}
                  accept="image/*"
                  type="file"
                />
              )}

              <input
                type="text"
                value={catogery}
                placeholder="Catogery Name"
                required
                onChange={(e) => setCatogery(e.target.value)}
              />
              <button
                style={
                  loading || uploadProgress
                    ? { cursor: "not-allowed", opacity: 0.5 }
                    : { cursor: "pointer", opacity: 1 }
                }
                onClick={
                  loading
                    ? () => {}
                    : uploadProgress
                    ? () => {}
                    : async (e) => await nayaCatogery(e)
                }
              >
                {loading
                  ? "Loading..."
                  : uploadProgress
                  ? "Uploading image"
                  : "Create Catogery"}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        {visible || create || update || createCatogery ? (
          <>
            <div className="dark"></div>
            {create || (update && activeTab === "Foods") ? (
              <div className="visible">
                <h1>
                  {create ? "Create Data" : "Update Data"}
                  <IoCloseOutline
                    className="icons"
                    onClick={() => {
                      setCreate(false), setUpdate(false), setVisible(false);
                      setName(""),
                        setPrice(""),
                        setIsVeg(""),
                        setDescription("");
                      setImage(""), setCatogery("");
                    }}
                  />
                </h1>
                <form className="form">
                  <input
                    type="text"
                    placeholder="Food name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <select
                    name="isVeg"
                    value={isVeg}
                    required
                    onChange={(e) => setIsVeg(e.target.value)}
                  >
                    <option value="">Veg?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  <select
                    name="isPopular"
                    required
                    value={isPopular}
                    defaultValue={false}
                    onChange={(e) => setIsPoupular(e.target.value)}
                  >
                    <option value="">Popular</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  <select
                    name="catogery"
                    value={catogery}
                    defaultValue={catogery}
                    required
                    onChange={(e) => setCatogery(e.target.value)}
                  >
                    <option>Catogery</option>
                    {catogeries.length > 0 &&
                      catogeries.map((catogery) => (
                        <option key={catogery._id} value={catogery.name}>
                          {catogery.name}
                        </option>
                      ))}
                  </select>
                  {image !== "" ? (
                    <div className="imgCont">
                      {create ? (
                        <h3>Image uploaded Successfully!!</h3>
                      ) : (
                        <input
                          onChange={(e) => UploadImage(e)}
                          style={{ width: "60%", height: "6rem" }}
                          accept="image/*"
                          type="file"
                        />
                      )}
                      <img
                        src={image}
                        alt="uploaded"
                        className="uploadedImage"
                      />
                    </div>
                  ) : (
                    <input
                      required
                      onChange={(e) => UploadImage(e)}
                      accept="image/*"
                      type="file"
                    />
                  )}
                  <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    required
                    maxLength={100}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {create && (
                    <button
                      style={
                        loading || uploadProgress
                          ? { cursor: "not-allowed", opacity: 0.5 }
                          : { cursor: "pointer", opacity: 1 }
                      }
                      onClick={
                        loading
                          ? () => {}
                          : uploadProgress
                          ? () => {}
                          : (e) => handleCreate(e)
                      }
                    >
                      {loading
                        ? uploadProgress
                          ? "Uploading image"
                          : "Loading..."
                        : "Create Data"}
                    </button>
                  )}
                  {update && (
                    <button
                      style={
                        loading || uploadProgress
                          ? { cursor: "not-allowed", opacity: 0.5 }
                          : { cursor: "pointer", opacity: 1 }
                      }
                      onClick={
                        loading
                          ? () => {}
                          : uploadProgress
                          ? () => {}
                          : (e) => handleUpdate(id, e)
                      }
                    >
                      {loading
                        ? uploadProgress
                          ? "Uploading image"
                          : "Loading..."
                        : "Update Data"}
                    </button>
                  )}
                </form>
              </div>
            ) : activeTab === "Admins" ? (
              <div className="visible userEd">
                <h1>
                  Update Admin Data{" "}
                  <IoCloseOutline
                    className="icons"
                    onClick={() => {
                      setCreate(false), setUpdate(false), setVisible(false);
                      setName(""),
                        setPrice(""),
                        setIsVeg(false),
                        setDescription("");
                    }}
                  />
                </h1>
                <form className="form">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {update && (
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUserUpdate(id)}
                    >
                      Update Admin
                    </button>
                  )}
                </form>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        <div className="core" style={{ width: "100%" }}>
          <div
            className="left"
            style={
              isLoading
                ? { width: "20%"}
                : { textAlign: "center" }
            }
          >
            <div className="top">
              <h1>Dashboard</h1>
              <ul>
                {tabs.map((items) => (
                  <li
                    key={items.title}
                    className={activeTab === items.title ? "active" : ""}
                    // style={tabs === "Corporate orders" ? {fontSize: "0.5rem"} : null}
                    onClick={() => setActiveTab(items.title)}
                  >
                    <items.icon /> {items.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bottom">
              <div className="logout">
                <button onClick={() => logout()}>
                  <IoLogOutOutline style={{ transform: "rotate(180deg)" }} />{" "}
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            {isLoading ? (
              <div
              style={{
                textAlign: "center",
                position: "absolute",
                inset: "45%",
                left: "55%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column",
                fontSize: "5rem",
              }}
              >
                <SmallLoader />
                Loading
              </div>
            ) : error ? (
              <div>Error</div>
            ) : data.length > 0 ? (
              <>
                <div
                  className={`content ${
                    activeTab === "Orders" ||
                    activeTab === "Corporate" ||
                    activeTab === "Foods"
                      ? "max"
                      : ""
                  }`}
                >
                  <div className="header">
                    <table
                      className={`${
                        activeTab === "Orders" || activeTab === "Corporate"
                          ? "maxout"
                          : ""
                      }`}
                      cellPadding="0"
                      cellSpacing="0"
                      border="0"
                    >
                      <thead>
                        <tr>
                          {keys.map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                          {activeTab !== "Orders" ? (
                            activeTab !== "Corporate orders" ? (
                              activeTab !== "Packages orders" ? (
                                <div className="empty">
                                  <h4>Action</h4>
                                </div>
                              ) : (
                                ""
                              )
                            ) : null
                          ) : (
                            ""
                          )}
                          {activeTab === "Orders" ||
                          activeTab === "Corporate orders" ||
                          activeTab === "Packages orders" ? (
                            <div className="empty">
                              <h4>Status</h4>
                            </div>
                          ) : (
                            ""
                          )}
                        </tr>
                      </thead>
                    </table>
                  </div>

                  {/* {visible ? create ?  <Create /> : "" : } */}
                  <table
                    className={`${
                      activeTab === "Orders" || activeTab === "Corporate"
                        ? "maxout"
                        : ""
                    }`}
                    cellPadding="0"
                    cellSpacing="0"
                    border="0"
                  >
                    <tbody>
                      {/* <Suspense fallback={<div>isLoading</div>}>  */}

                      {isLoading ? (
                        <tr>isLoading</tr>
                      ) : error ? (
                        <tr>Error</tr>
                      ) : data.length > 0 ? (
                        <>
                          {data.map((item, index) => (
                            <>
                              <tr>
                                {Object.keys(item)
                                  .filter(
                                    (key) =>
                                      key !== "_id" &&
                                      key !== "__v" &&
                                      key !== "status" &&
                                      key !== "firebaseToken"
                                  )
                                  .map((key) => {
                                    return (
                                      <>
                                        <td key={key}>
                                          {
                                            <>
                                              {typeof item[key] === "string" &&
                                              item[key].startsWith("http") &&
                                              (item[key].includes(
                                                "googleusercontent"
                                              ) ||
                                                item[key].includes(
                                                  "res.cloudinary.com"
                                                )) &&
                                              // item[key].includes("googleusercontent")
                                              item[key].slice(0, 50) ? (
                                                <img
                                                  src={item[key]}
                                                  alt={`Image ${index}`}
                                                  style={{
                                                    width: "35px",
                                                    borderRadius: "50px",
                                                    height: "auto",
                                                  }}
                                                />
                                              ) : item[key] === true ? (
                                                "Yes"
                                              ) : item[key] === false ? (
                                                "No"
                                              ) : Array.isArray(item[key]) ? (
                                                key === "statusHistory" ? 
                                                (
                                                  <Link
                                                    to={"/dashboard/history"}
                                                    state={{
                                                      id: item._id,
                                                      tab: activeTab,
                                                    }}
                                                    style={{
                                                      textDecoration: "none",
                                                      color: "royalblue",
                                                    }}
                                                  >
                                                    check history
                                                  </Link>
                                                ) :
                                                key === "mynote" ? (
                                                  <Link 
                                                  style={{
                                                    textDecoration: "none",
                                                    color: "royalblue",
                                                  }}
                                                  to={'/dashboard/notes'} state={{id: item._id}}>
                                                    View notes
                                                  </Link>)
                                                : (
                                                  <Link
                                                    to={`/dashboard/items`}
                                                    state={{
                                                      id: item._id,
                                                      arry: item[key],
                                                      ttle: item.title,
                                                    }}
                                                    style={{
                                                      textDecoration: "none",
                                                      color: "royalblue",
                                                    }}
                                                  >
                                                    View
                                                  </Link>
                                                )
                                              ) : (
                                                item[key]
                                              )}
                                            </>
                                          }
                                        </td>
                                      </>
                                    );
                                  })}
                                {activeTab !== "Orders" ? (
                                  activeTab !== "Corporate orders" ? (
                                    activeTab !== "Packages orders" ? (
                                      <div className="empty icons">
                                        {loading ? (
                                          <FaSpinner className="spinner" />
                                        ) : (
                                          <>
                                            {activeTab === "Clients" ||
                                            activeTab === "Services" ||
                                            activeTab === "Faq" ||
                                            activeTab === "Category" ? (
                                              <Link
                                                to={"/dashboard/edit"}
                                                state={{
                                                  tab: activeTab,
                                                  id: item._id,
                                                  image: item.image,
                                                  name: item.name,
                                                  question: item.question,
                                                  answer: item.answer,
                                                  catogery: item.catogery,
                                                }}
                                              >
                                                {" "}
                                                <FaRegEdit
                                                  className="edit"
                                                  size={18}
                                                />
                                              </Link>
                                            ) : activeTab === "Corporate" ||
                                              activeTab === "Packages" ? (
                                              <Link
                                                to={"/dashboard/corporate"}
                                                state={{
                                                  id: item._id,
                                                  name: item.title,
                                                  description: item.description,
                                                  image: item.image,
                                                  actualPrice: item.actualPrice,
                                                  discountedPrice:
                                                    item.discountedPrice,
                                                  catogery: item.catogery,
                                                  items: item.items,
                                                  tag: item.tags,
                                                  tab: activeTab,
                                                }}
                                              >
                                                {" "}
                                                <FaRegEdit
                                                  className="edit"
                                                  size={18}
                                                />
                                              </Link>
                                            ) : (
                                              <FaRegEdit
                                                className="edit"
                                                size={18}
                                                onClick={() => {
                                                  {
                                                    setVisible(true);
                                                    setUpdate(true);
                                                    setAdmin(true);
                                                    update
                                                      ? console.log("nalla")
                                                      : handleEdit(
                                                          "edit",
                                                          item._id
                                                        ),
                                                      setId(item._id);
                                                  }
                                                }}
                                              />
                                            )}
                                            <FaRegTrashAlt
                                              className="delete"
                                              size={18}
                                              onClick={() => {
                                                handleEdit("delete", item._id);
                                              }}
                                            />
                                          </>
                                        )}
                                      </div>
                                    ) : (
                                      <></>
                                    )
                                  ) : null
                                ) : (
                                  <></>
                                )}
                                {activeTab === "Orders" && (
                                  <>
                                    <select
                                      key={index}
                                      defaultValue={
                                        selectedStatus[item._id]
                                      }
                                      // value={selectedStatus[item._id]}
                                      onChange={(e) => {
                                        handleStatusChange(e, item._id);
                                        // activeTab === "Corporate orders" && corporateStatusChange(e, item._id);
                                      }}
                                    >
                                      {selectedStatus!=="" ? (
                                        options.map((option, index) => {
                                          const currentIndex = options.indexOf(
                                            selectedStatus[item._id]
                                          );
                                          const isDisabled =
                                            index !== currentIndex &&
                                            index !== currentIndex + 1;

                                          return (
                                            <option
                                              key={option}
                                              value={option}
                                              disabled={isDisabled}
                                            >
                                              {option}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option>Loading...</option>
                                      )}
                                    </select>
                                  </>
                                )}
                                {activeTab === "Corporate orders" && (
                                  <>
                                    <select
                                      key={index}
                                      defaultValue={
                                        selectedStatus[item._id]
                                      }
                                      onChange={(e) => {
                                        corporateStatusChange(e, item._id);
                                      }}
                                    >
                                      {selectedStatus!=="" ? (
                                        options.map((option, index) => {
                                          const currentIndex = options.indexOf(
                                            selectedStatus[item._id]
                                          );
                                          const isDisabled =
                                            index !== currentIndex &&
                                            index !== currentIndex + 1;

                                          return (
                                            <option
                                              key={option}
                                              value={option}
                                              disabled={isDisabled}
                                            >
                                              {option}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option>Loading...</option>
                                      )}
                                    </select>
                                  </>
                                )}

                                {activeTab === "Packages orders" && (
                                  <>
                                    <select
                                      key={index}
                                      defaultValue={
                                        selectedStatus[item._id]
                                      }
                                      onChange={(e) => {
                                        packagesStatusChange(e, item._id);
                                      }}
                                    >
                                      {selectedStatus!=="" ? (
                                        options.map((option, index) => {
                                          const currentIndex = options.indexOf(
                                            selectedStatus[item._id]
                                          );
                                          const isDisabled =
                                            index !== currentIndex &&
                                            index !== currentIndex + 1;

                                          return (
                                            <option
                                              key={option}
                                              value={option}
                                              disabled={isDisabled}
                                            >
                                              {option}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option>Loading...</option>
                                      )}
                                    </select>
                                  </>
                                )}
                              </tr>
                            </>
                          ))}
                        </>
                      ) : (
                        <div>
                          <h2>NO Data is available to show</h2>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div>
                <h2>NO Data is available to show</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
