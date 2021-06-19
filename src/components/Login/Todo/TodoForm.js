  
import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [input2, setInput2] = useState(props.edit ? props.edit.value : '');
  
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleChange2 = e => {
    setInput2(e.target.value);
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
            placeholder='Update Parent Name'
            value={input}
            onChange={handleChange}
            name='text'
           // ref={inputRef}
            className='todo-input edit'
          /> <p>
          <input
            type = 'number'
            placeholder='Update Parent Number'
            value={input2}
            onChange={handleChange}
            name='text2'
           // ref={inputRef}
            className='todo-input edit'
          />
          </p>
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add Parent Name'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
           // ref={inputRef}
          />
          <p>
          <input
            type = 'number'
            placeholder='Add Parent Number'
            value={input2}
            onChange={handleChange2}
            name='text2'
            className='todo-input'
           // ref={inputRef}
          />
          </p>
          <button onClick={handleSubmit} className='todo-button'>
            Add 
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;