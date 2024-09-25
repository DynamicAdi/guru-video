import React, { useEffect, useState } from 'react'
import './styles.scss';
import OpenFaq from './slider';
import axios from 'axios';
import SmallLoader from '../../global/loader/SmallLoader';

function FAQ({backend}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getFaq = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/Faq`);
      setData(response.data);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getFaq();    
  }, [])
  return (
    <div className='container'>
        <h1>FAQ</h1>
        <div className="faqChild">
            <div className="faq">
                <h2>Catering service</h2>
                {loading ? <SmallLoader /> : data && data
                .filter(item => item.catogery === 'catering')
                .map((item, index) => (
                  <OpenFaq question={item.question} answer={item.answer} key={index} /> 
                ))}
            </div>
            <div className="faq">
            <h2>Decor service</h2>
            {loading ? <SmallLoader /> : data && data
                .filter(item => item.catogery === 'decor')
                .map((item, index) => (
                  <OpenFaq question={item.question} answer={item.answer} key={index} /> 
                ))}
            </div>
        </div>
    </div>
  )
}

export default FAQ