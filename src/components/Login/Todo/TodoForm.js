  
import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [input2, setInput2] = useState(props.edit ? props.edit.value : '');
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };
  

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      text2: input2

    });
    setInput('');
    setInput2('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your Package'
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
            placeholder='Add Package Name'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <p>
          <input
            placeholder='From'
            value={input2}
            onChange={handleChange}
            name='text2'
            className='todo-input'
           // ref={inputRef}
          />
          </p>
          <button onClick={handleSubmit} className='todo-button'>
            Add Package
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;