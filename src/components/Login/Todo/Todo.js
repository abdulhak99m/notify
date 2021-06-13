import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit,TiFolderAdd, TiTick} from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, userId,addTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    dbId:null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value,edit.dbId);
    setEdit({
      dbId:null,
      id: null,
      value: ''
    });
  };
  

  const renderMyTodoList = () => {
      return Object.keys(todos).filter((val) => {
            if(userId === null)
            return val

            else if (userId === todos[val].userId)
            {
                return val
            }
        }).map((todo, index) => {
        return (
        <div
          className={todos[todo].isComplete ? 'todo-row complete' : 'todo-row incomplete'}
          key={index}
        >
          <div key={todos[todo].id} onClick={() => completeTodo(todos[todo].id)}>
            <p style={{textAlign:'left',fontSize:'1.2rem'}}>{todos[todo].text}</p>
            <p style={{marginTop:'-12px'}}>{todos[todo].createdAt}</p>
          </div>

          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todos[todo].id,todo)}
              className='delete-icon'
            />
            <TiEdit
              onClick={() => setEdit({ id: todos[todo].id, value: todos[todo].text,dbId: todo})}
              className='edit-icon'
            />
            {todos[todo].isComplete === false && <div style={{backgroundColor:'#5d0cff',padding:'10px 10px',marginLeft:'15px',cursor:'pointer'}}>
             <TiTick
               onClick={() => completeTodo(todos[todo].text,todo)}
               className='edit-icon'
            />
            </div>}
           
          </div>
        </div>
      )});
    };

    const renderOthersTodoList = () => {
        return Object.keys(todos).filter((val) => {
              if(userId === null)
              return val
  
              else if (userId !== todos[val].userId)
              {
                  return val
              }
          }).map((todo, index) => {
          return (
          <div
            className='todo-row'
            key={index}
          >
            <div key={todos[todo].id} style={{position:'relative'}}>
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>{todos[todo].text}{todos[todo].isComplete === true &&
              <div style={{position:'absolute',right:'0px',top:'0px'}}><TiTick style={{marginLeft:'5px',color:'white',fontSize:'1rem',fontWeight:'bold',marginTop:'-3px'}}></TiTick><span style={{textDecoration:'underline',fontSize:'1rem'}}>Completed</span></div> } </p>
              <p style={{fontWeight:'bold',marginTop:'-15px'}}>{todos[todo].email}</p>
              <p style={{fontWeight:'bold',marginTop:'-15px',marginLeft:'-15px'}}>Created At: {todos[todo].createdAt}</p>
            </div>
            <div className='icons'>
              <TiFolderAdd
                onClick={() => addTodo({ id: Math.floor(Math.random() * 10000), text: todos[todo].text })}
                className='add-icon'
              />
              
            </div>
          </div>
        )});
      };
  

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return  (
      <>
      <h2 style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px'}}>My Todo List</h2>
      {renderMyTodoList()}
      <h2 style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px',marginTop:'20px'}}>Others Todo List</h2>
        
      {renderOthersTodoList()}
      </>
  )
}

export default Todo;