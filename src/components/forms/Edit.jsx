import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function Edit({backend}) {
    const location = useLocation();
    const {tab, image, name: nme, id, question: q, answer: a, catogery: cat} = location.state || "";

    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    // For Faq,
    const [question, setQuestion] = useState(q);
    const [answer, setAnswer] = useState(a);
    const [catogery, setCatogery] = useState(cat);

    // For Client || Services 
    const [name, setName] = useState(nme);
    const [imageUrl, setImageUrl] = useState(image);
    const [uploadProgress, setUploadProgress] = useState(0);
  

        const uploadImage = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
      
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'my_unsigned_preset');
      
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/dozknak00/image/upload`,
              formData,
              {
                onUploadProgress: (progressEvent) => {
                  const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setUploadProgress(progress);
                },
              }
            );
            console.log(response.data.secure_url);
            setImageUrl(response.data.secure_url);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
       };     

    const uploadFaq = async () => {
      if (catogery === "" || question === "" || answer === "") {
        alert("Please fill all the details");
        return null;
      }
        try {
          setLoading(true);
          const response = await axios.put(`${backend}/updateFaq`, {
            id: id,
            question: question,
            answer: answer,
            catogery: catogery,
          });
          console.log(response);
          if (response.statusText === 'OK') {
              setLoading(false);
            window.history.back();
          }
        } catch (error) {
          console.log(error);
        }
      };

      const uploadServices = async () => {
        if (id==="" || name === "" || imageUrl === "") {
          alert("Please full all the details")
          return null;
        }
        try {
          setLoading(true);
          const response = await axios.put(`${backend}/postServices`, {
            id: id,
            name: name,
            image: imageUrl
          });
          console.log(response);
          if (response.statusText === 'OK') {
              setLoading(false);
            window.history.back();
          }
        } catch (error) {
          console.log(error);
        }
      };

      const uploadClient = async () => {
        if (id==="" || name === "" || imageUrl === "") {
          alert("Please full all the details")
          return null;
        }
        try {
          setLoading(true);
          const response = await axios.put(`${backend}/postClient`, {
            id: id,
            name: name,
            image: imageUrl
          });
          console.log(response);
          if (response.statusText === 'OK') {
              setLoading(false);
            window.history.back();
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    const handleClick = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (tab === "Faq") {
            uploadFaq();
        }
        else if (tab === "Clients") {
            uploadClient();
        }
        else if (tab === "Services") {
            uploadServices();
        }
    }
  return (
    <div className='main'>
    <div className="back glow" onClick={() => window.history.back()}>Back</div>
    <h1>Edit Data {tab}</h1>
    <div className="center">
        <form>
    {tab === "Services" && (<>
        <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)}/>
            {imageUrl !== "" ? 
            (
                <>
                                    <input
                    onChange={(e) => uploadImage(e)} 
                    accept="image/*" type="file" />
                
                <div className="imgCont">
                    <img src={imageUrl} alt="uploaded" className="uploadedImage" />
                        <h3>Current Image</h3>
                  </div>
                  </>
                ) : ( 
                    <input
                    onChange={(e) => uploadImage(e)} 
                    accept="image/*" type="file" />
                )}
          {uploadProgress > 0 && <progress value={uploadProgress} color='orange' max="100">{uploadProgress}%</progress>}
        </>)}
      {tab === "Clients" && (<>
        <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)}/>
        {imageUrl !== "" ? 
            (
                <div className="imgCont">
                    <img src={imageUrl} alt="uploaded" className="uploadedImage" />
                        <h3>{imageUrl!== imageUrl ? "New Image" : "Current Image"}</h3>
                  </div>
                ) : ( 
                    <input
                    onChange={(e) => uploadImage(e)} 
                    accept="image/*" type="file" />
                )}
          {uploadProgress > 0 && <progress value={uploadProgress} color='orange' max="100">{uploadProgress}%</progress>}
      </>
      )}
            {tab==="Faq" && (
                <>
                <input type="text" placeholder='Question' required value={question} onChange={(e) => setQuestion(e.target.value)}/>
                <input type="text" placeholder='Answer' required value={answer} onChange={(e) => setAnswer(e.target.value)}/>
               <select
               required
               value={catogery}
               onChange={(e) => setCatogery(e.target.value)}
               >
                <option value={""}>Please select catogery</option>
                <option value={"catering"}>Catering</option>
                <option value={"decor"}>Decor</option>
               </select>
            </>)}
            <button className="glow"
            onClick={(e) => handleClick(e)}
            >
                {loading ? "Uploading..." : "Update Data"}
            </button>
        </form>
    </div>
</div>
  )
}

export default Edit