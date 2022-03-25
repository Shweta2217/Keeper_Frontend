import React from 'react';

import{ useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Loader from "./loader"; 

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch("https://kepeer.deta.dev/notes",
    {method :"GET",
     headers: {token : window.localStorage.getItem("Token")},
    })
      .then(res => res.json())
      .then((data) => {
        setNotes(data.items);
        setLoading(false);
      })
    }, [loading]);
    
  function addNote(newNote) {
    setLoading(true);
    let url = "https://kepeer.deta.dev/note";
    fetch(url, {
      method: "POST", headers: { token: window.localStorage.getItem("Token"),"Content-Type": "application/json" }, body: JSON.stringify(newNote)
    }).then((res) => res.json())
      .then((data) => {console.log(data);})

  }

  function deleteNote(id) {
    setLoading(true);
    let url = `https://kepeer.deta.dev/delete/${id}`;
    fetch(url, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {console.log(data);});
  } 
  
  return (
    <div>
      <CreateArea onAdd={addNote} />
      {loading ? <Loader /> : <>  {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.key}
            id={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            />
        );
      })}</>}

      </div>
      );
      
}
