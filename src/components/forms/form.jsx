import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import "./tags.scss";
import { useEffect } from "react";
import SmallLoader from "../../global/loader/SmallLoader";
import { useLocation } from "react-router-dom";

function Form({ backend }) {
  const location = useLocation();
  const {
    id,
    name,
    description,
    actualPrice,
    discountedPrice,
    catogery,
    items,
    image,
    tag,
    tab,
  } = location.state || "";

  const url = "http://localhost:8080";
  const [tags, setTags] = useState(items || []);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [textTags, setTextTags] = useState(tag || []);
  const [inputValue, setInputValue] = useState("");

  const [imageUrl, setImageUrl] = useState(image || []);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [nextPhase, setnextPhase] = useState(false);
  const [corporate, setCorporate] = useState({
    name: name || "",
    description: description || "",
    actualPrice: actualPrice || "",
    discountedPrice: discountedPrice || "",
    catogery: catogery || "",
    items: tags,
    image: imageUrl,
    tags: textTags,
  });

  const getFoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/foods`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);

  const handleAddTag = (e) => {
    e.preventDefault();

    let values = e.target.value;
    if (!tags.includes(values)) {
      setTags((prevTags) => [...prevTags, values]);
      setCorporate((prevCorporate) => ({
        ...prevCorporate,
        items: [...prevCorporate.items, values],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setCorporate((prevCorporate) => ({
     ...prevCorporate,
      items: prevCorporate.items.filter((item) => item!== tagToRemove),
    }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset");

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dozknak00/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
        setImageUrl((img) => [...img, response.data.secure_url]),
        setCorporate((prevCorporate) => ({
          ...prevCorporate,
          image: [...prevCorporate.image, response.data.secure_url],
        }))

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddTextTag = (e) => {
    e.preventDefault();
    if (
      !textTags.includes(inputValue) &&
      inputValue !== "" &&
      textTags.length < 4
    ) {
      setTextTags((prevTextTags) => [...prevTextTags, inputValue]);
      setCorporate((prevCorporate) => ({
        ...prevCorporate,
        tags: [...prevCorporate.tags, inputValue],
      }));
      setInputValue("");
    } else if (textTags.length > 4) {
      alert("Maximum 3 tags allowed");
    } else if (textTags.includes(inputValue)) {
      alert("Tag already added");
    }
  };
  const removeTextTag = (tagToRemove) => {
    setTextTags(textTags.filter((tag) => tag !== tagToRemove));
    setCorporate((prevCorporate) => ({
     ...prevCorporate,
      tags: prevCorporate.tags.filter((tag) => tag!== tagToRemove),
    }));
  };

  const isDisabled = textTags.length === 4 ? true : false;
  const disableImageUpload = imageUrl.length === 5 || loading ? true : false;
  const nextPhaseHandler = (e) => {
    e.preventDefault();
    if (
      corporate.name !== "" ||
      corporate.description !== "" ||
      corporate.actualPrice !== "" ||
      corporate.discountedPrice !== "" ||
      corporate.items.length !== 0 ||
      corporate.catogery !== ""
    ) {
      setnextPhase(true);
    } else {
      alert("Please fill all the fields");
    }
  };

  const backPhaseHandler = (e) => {
    e.preventDefault();
    setnextPhase(false);
  };
  const removeImage = (index) => {
    setImageUrl((prevImages) => prevImages.filter((_, i) => i !== index));
    setCorporate((prevCorporate) => ({
      ...prevCorporate,
      image: prevCorporate.image.filter((_, i) => i !== index),
    }));
  };

  const addCorporate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/addCorporate`, {
        name: corporate.name,
        description: corporate.description,
        actualPrice: corporate.actualPrice,
        discountedPrice: corporate.discountedPrice,
        catogery: corporate.catogery,
        image: corporate.image,
        items: corporate.items,
        tags: corporate.tags,
      });
      if (response.status === 200) {
        setCorporate({
          name: "",
          description: "",
          actualPrice: "",
          discountedPrice: "",
          catogery: "",
          image: "",
          items: [],
          tags: [],
        });
        setLoading(false);
        const url = window.location.href;
        window.location.replace(url.split("/corporate").slice(0, -1).join("/"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addPackages = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/createPackages`, {
        name: corporate.name,
        description: corporate.description,
        image: corporate.image,
        catogery: corporate.catogery,
        items: corporate.items,
        tags: corporate.tags,
      });
      if (response.status === 200) {
        setCorporate({
          name: "",
          description: "",
          catogery: "",
          image: "",
          items: [],
          tags: [],
        });
        setLoading(false);
        const url = window.location.href;
        window.location.replace(url.split("/corporate").slice(0, -1).join("/"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePackages = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${url}/updatePackages`, {
        id: id, // Update the id with the actual id of the corporate you want to update
        name: corporate.name,
        description: corporate.description,
        image: corporate.image,
        catogery: corporate.catogery,
        items: corporate.items,
        tags: corporate.tags,
      });
      if (response.status === 200) {
        setLoading(false);
        const url = window.location.href;
        window.location.replace(url.split("/corporate").slice(0, -1).join("/"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCorporate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${url}/updateCorporate`, {
        id: id,
        name: corporate.name,
        description: corporate.description,
        actualPrice: corporate.actualPrice,
        discountedPrice: corporate.discountedPrice,
        catogery: corporate.catogery,
        image: corporate.image,
        items: corporate.items,
        tags: corporate.tags,
      });
      if (response.status === 200) {
        setCorporate({
          name: "",
          description: "",
          actualPrice: "",
          discountedPrice: "",
          catogery: "",
          image: "",
          items: [],
          tags: [],
        });
        setLoading(false);
        const url = window.location.href;
        window.location.replace(url.split("/corporate").slice(0, -1).join("/"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main">
      <button
        className="glow"
        style={{
          position: "absolute",
          inset: "2%",
          width: "fit-content",
          height: "fit-content",
        }}
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <h1>
        {tab === "Packages" && "Add Packages"}
        {tab === "Corporate" && "Add Corporate"}
      </h1>
      <div className="center">
        {tab === "Corporate" && (
          <>
            <form
              className="form1"
              style={
                nextPhase
                  ? { opacity: 0, zIndex: -10 }
                  : { opacity: 1, zIndex: 10 }
              }
            >
              <input
                value={corporate.name ? corporate.name : ""}
                type="text"
                placeholder="Title"
                required
                onChange={(e) =>
                  setCorporate({ ...corporate, name: e.target.value })
                }
              />
              <textarea
                type="text"
                style={{ height: "100px" }}
                maxLength={100}
                placeholder="Description"
                value={corporate.description ? corporate.description : ""}
                required
                onChange={(e) =>
                  setCorporate({ ...corporate, description: e.target.value })
                }
              />
              <input
                value={corporate.actualPrice ? corporate.actualPrice : ""}
                type="number"
                placeholder="Actual Price"
                required
                onChange={(e) =>
                  setCorporate({ ...corporate, actualPrice: e.target.value })
                }
              />
              <input
                value={
                  corporate.discountedPrice ? corporate.discountedPrice : ""
                }
                type="number"
                placeholder="Discounted Price"
                required
                onChange={(e) =>
                  setCorporate({
                    ...corporate,
                    discountedPrice: e.target.value,
                  })
                }
              />
              <select
                required
                defaultValue={
                  corporate.catogery !== "" ? corporate.catogery : ""
                }
                onChange={(e) =>
                  setCorporate({ ...corporate, catogery: e.target.value })
                }
              >
                <option>Select the category</option>
                <option value={"basic"}>Basic</option>
                <option value={"advanced"}>Advanced</option>
                <option value={"luxury"}>Luxury</option>
              </select>
              <div className="tag-input-container">
                <div className="tags-container">
                  {tags.length === 0 && (
                    <h3 className="placeholder">
                      Select food from the list below
                    </h3>
                  )}
                  {tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      <span
                        className="remove-tag"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <select
                onChange={(e) => {
                  handleAddTag(e);
                }}
              >
                <option value={""}>Select food items</option>
                {loading
                  ? "Loading..."
                  : data.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </select>
              <button className="glow" onClick={(e) => nextPhaseHandler(e)}>
                Next
              </button>
            </form>

            <form
              className="form2"
              style={
                nextPhase
                  ? { opacity: 1, zIndex: 10 }
                  : { opacity: 0, zIndex: -10 }
              }
            >
              <div className="tag-input-container" style={{ height: "80px" }}>
                <div className="tags-container">
                  {textTags.length === 0 && (
                    <h3 className="placeholder">
                      Add Tags from below {"(max - 4)"}
                    </h3>
                  )}
                  {textTags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      <span
                        className="remove-tag"
                        onClick={() => removeTextTag(tag)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTextTag(e)}
                placeholder={
                  isDisabled
                    ? "Maximum limit reached"
                    : "Add Tags and press enter"
                }
                style={
                  isDisabled ? { cursor: "not-allowed" } : { cursor: "text" }
                }
                disabled={isDisabled}
              />

              <div className="imgViewer">
                {loading ? (
                  <SmallLoader />
                ) : (
                  imageUrl &&
                  imageUrl.map((item, index) => (
                    <div className="imgContainer" key={index}>
                      <button
                        className="remove-img"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                      <img src={item} alt={index} />
                    </div>
                  ))
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                placeholder="Upload your image"
                value={""}
                onChange={(e) => uploadImage(e)}
                disabled={disableImageUpload}
              />
              <div className="btns" style={{ width: "20%" }}>
                <button
                  className="glow dim"
                  style={{ marginRight: "5%" }}
                  onClick={(e) => backPhaseHandler(e)}
                >
                  Back
                </button>

                {id !== undefined ? (
                  <button
                    className="glow"
                    onClick={loading ? () => {} : (e) => updateCorporate(e)}
                  >
                    {loading ? "Loading..." : "Update corporate box"}
                  </button>
                ) : (
                  <button
                    className="glow"
                    onClick={loading ? () => {} : (e) => addCorporate(e)}
                  >
                    {loading ? "Loading..." : "Add corporate box"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
        {tab === "Packages" && (
          <>
            <form>
              <input
                required
                type="text"
                placeholder="Title"
                value={corporate.name}
                onChange={(e) =>
                  setCorporate({ ...corporate, name: e.target.value })
                }
              />
              <textarea
                required
                type="text"
                placeholder="Description"
                style={{ height: "80px" }}
                value={corporate.description}
                onChange={(e) =>
                  setCorporate({ ...corporate, description: e.target.value })
                }
              />
              <div className="imgViewer">
                {loading ? (
                  <SmallLoader />
                ) : (
                  imageUrl &&
                  imageUrl.map((item, index) => (
                    <div className="imgContainer" key={index}>
                      <button
                        className="remove-img"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                      <img src={item} alt={index} />
                    </div>
                  ))
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                placeholder="Upload your image"
                value={""}
                onChange={(e) => uploadImage(e)}
                disabled={disableImageUpload}
              />
              <select required defaultValue={corporate.catogery} onChange={(e) => setCorporate({...corporate, catogery: e.target.value})}>
                <option value="">Select the category</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
                <option value="luxury">Luxury</option>
              </select>
                
              <div className="tag-input-container">
                <div className="tags-container">
                  {tags.length === 0 && (
                    <h3 className="placeholder">
                      Select food from the list below
                    </h3>
                  )}
                  {tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      <span
                        className="remove-tag"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <select required onChange={(e) => handleAddTag(e)}>
                <option value={""}>Select food items</option>
                {loading
                  ? "Loading..."
                  : data.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </select>
              <div className="tag-input-container" style={{ height: "80px" }}>
                <div className="tags-container">
                  {textTags.length === 0 && (
                    <h3 className="placeholder">
                      Add Tags from below {"(max - 4)"}
                    </h3>
                  )}
                  {textTags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      <span
                        className="remove-tag"
                        onClick={() => removeTextTag(tag)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTextTag(e)}
                placeholder={
                  isDisabled
                    ? "Maximum limit reached"
                    : "Add Tags and press enter"
                }
                style={
                  isDisabled ? { cursor: "not-allowed" } : { cursor: "text" }
                }
                disabled={isDisabled}
              />
              {id === undefined ? (
                <button
                  className="glow"
                  style={
                    loading
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : { opacity: 1, cursor: "pointer" }
                  }
                  onClick={loading ? () => {} : (e) => addPackages(e)}
                >
                  {loading ? "Loading" : "Add Packages"}
                </button>
              ) : (
                <button
                  className="glow"
                  style={
                    loading
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : { opacity: 1, cursor: "pointer" }
                  }
                  onClick={loading ? () => {} : (e) => updatePackages(e)}
                >
                  {loading ? "Loading" : "Update Packages"}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Form;
