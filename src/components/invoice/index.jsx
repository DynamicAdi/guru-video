import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import logo from "/logo.png";
import Table from "./Table";
import { useLocation } from "react-router-dom";
import SmallLoader from "../../global/loader/SmallLoader";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Invoice({backend}) {
  const location = useLocation();
  const { id } = location.state || "";
  const [loading, setLoading] = useState(false);
  const [mailSend, setMailSend] = useState(false);
  const [data, setData] = useState([]);

  const getInvoice = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/invoice/${id}`);
      if (response.status === 200) {
        setData(response.data);
        
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, [])

  const ref = useRef();
  const sendPdf = async () => {
    const input = ref.current;


    html2canvas(input, { scale: 1 }).then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pageWidth = canvas.width;
        const pageHeight = canvas.height;
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [pageWidth, pageHeight],
        });
  
        // Add the canvas image to the PDF with full width and height
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

      const pdfFile = pdf.output("blob");
      const formData = new FormData();
      formData.append("pdf", pdfFile, "invoice.pdf");
      formData.append("customerEmail", `${data[0].email}`);
      try {
          setMailSend(true);
          const res = await axios
          .post(`${backend}/send-invoice`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
        })

        if (res.status===200) {
            const url = window.location.href;
            window.location.replace(url.split("/corporate").slice(0, -1).join("/dashboard"));
            setMailSend(false);
        }
    } catch (e) {
        console.error("Failed to send invoice", e);
      }
    });
  };


  return (
    <>
      <button className="glow" onClick={() => window.history.back()}>
        Back
      </button>
      <div className="box-cont" ref={ref}>
        <div className="child">
          {loading ? (
            <SmallLoader />
          ) : data.length > 0 ? data.map((data, index) => 
            (
                <>
                  <div className="upper">
                    <div className="billing">
                      <h2>Customer information</h2>
                      <p>{data.name}</p>
                      <p>{data.email}</p>
                      <p>{data.phone}</p>
                      <address>
                        {data.address}
                      </address>
                    </div>
    
                    <div className="image">
                      <img src={logo} alt="" />
                    </div>
    
                    <div className="billing invoice">
                      <h2>Invoice</h2>
                      <p>ID: # {data._id}</p>
                      <p>Date: {data.date}</p>
                    </div>
                  </div>
                  <div className="middle">
                    <Table data={data.items} />
                  </div>
                </>
              )
        )  : (
            <div>
              <h1>NO DATA FOUND!</h1>
            </div>
          )}
        </div>
      </div>
      <div className="lower">
        <button className="glow sec"
        style={mailSend ? {cursor: 'not-allowed', opacity: 0.5} : {cursor: 'pointer', opacity: 1}}
        onClick={mailSend ? () => {} : () => sendPdf()}>{mailSend ? "Sending...": "Send Invoice to customer"}</button>
      </div>
    </>
  );
}

export default Invoice;