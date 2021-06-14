  
import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [from, setFrom] = useState('');
  
  const inputRef = useRef(null);
  const fromRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
    fromRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
    setFrom(e.target.from);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
     text2:from
    });
    setInput('');
    setFrom('');
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
            ref={inputRef}
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
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
            <input
            placeholder='From'
            value={from}
            onChange={handleChange}
            name='text2'
            className='todo-input'
            ref={fromRef}
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