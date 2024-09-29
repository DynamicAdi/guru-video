import React, { useEffect, useState } from 'react'
import './notes.scss';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import SmallLoader from '../../global/loader/SmallLoader';
import {MdEdit, MdDeleteOutline} from 'react-icons/md'

function Notes() {
  const backend = 'http://localhost:8080';
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [note, setNote] = useState('');
  const [oldnote, setOldnote] = useState('');
  const [changes, setChanges] = useState(false);
  const location = useLocation();
  const { id } = location.state || {};
  // console.log(id);
  
  const getNotes = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${backend}/notes/${id}`);
      setData(response.data);            
      setloading(false);
    }
    catch(e) {
      console.log(e);
    }
  }

  const addNote = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post(`${backend}/notes/add`, { id: id, mynote: note });
      if(response.status === 200) {
        setNote('');
        getNotes();
        setloading(false);
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.put(`${backend}/notes/update`, { id: id, newNote: note, oldNote: oldnote});
      if(response.status === 200) {
        setNote('');
        getNotes();
        setloading(false);
        setChanges(false);
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  const activate = (items) => {
    console.log(items);
    
    setNote(items);
    setOldnote(items);
    setChanges(true);
  }
  
  const deleteNote = async (item) => {
    try {
      setloading(true);
      const response = await axios.delete(`${backend}/notes/delete/${id}/${item}`);
      if(response.status === 200) {
        getNotes();
        setloading(false);
      }
    }

    catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getNotes();
  }, [])
  return (
    <>
    <button className='glow' style={{margin: '1% 0px 0px 1%', width: 'fit-content'}} onClick={() => window.history.back()}>Back</button>
    <div className='notes'>
            <h1>Personalized notes for Name</h1>
        <div className="child">
            <div className="boxes">
            {loading ? <SmallLoader /> : data.length === 0 ? 
            <h1 style={{color: 'crimson'}}>No Notes found</h1>
            : data.map((items, index) => (
            items.mynote.map((item, index) => (
              <div className="box" key={index}>
                <div className="editor">
                  <div className="edit" onClick={() => activate(item)}><MdEdit size={35} /></div>
                  <div className="edit" onClick={(e) => {deleteNote(item), e.preventDefault()}}><MdDeleteOutline size={35} /></div>
                </div>
                <p>{item}</p>
            </div>
              ))
            ))}
            </div>

            <div className="addition">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Add your notes...' />
                <button className='glow' onClick={changes ? (e) => updateNote(e) : (e) => addNote(e)}>Add note</button>
            </div>
        </div>
    </div>
            </>
  )
}

export default Notes