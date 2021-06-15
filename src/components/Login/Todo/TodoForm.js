  
import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
 // const [input, setInput] = useState(props.edit ? props.edit.value : '');
 const [input, setInput] = useState({package: '', from: ''})
  const inputRef = useRef(null);
  
  
  //  useEffect(() => {
  //    inputRef.current.focus();
    
  //  });

  const handleChange = e => {
    let value = e.target.value;
    let theForm = e.target.theForm;


  setInput((prevalue) => {
    return {
      ...prevalue,   // Spread Operator               
      [theForm]: value
    }
  })
   }

  

  const handleSubmit = e => {
    e.preventDefault();
    //alert('A name was submitted: ');
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      
    });
    setInput('');
    alert('A name was submitted: ');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
          //  ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Package Name'
           // value={input}
            onChange={handleChange}
            name='package'
            className='todo-input'
          // ref={inputRef}
          />

        <input
            placeholder='from'
          //  value={from}
            onChange={handleChange}
            name='from'
            className='todo-input'
            //ref={inputRef}
          />
           
           
          <button onClick={handleSubmit} className='todo-button'>
          Post my Package
          </button>
        </>
      )}
    </form>
  );
}


export default TodoForm;