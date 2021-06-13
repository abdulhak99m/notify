import React, { useState } from 'react';
import $ from 'jquery'
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit,TiFolderAdd, TiTick} from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, userId,addTodo ,addOthersTodo}) => {
  const [edit, setEdit] = useState({
    id: null,
    dbId:null,
    data:{},
    value: ''
  });



  const submitUpdate = value => {
    updateTodo(edit.id, value,edit.dbId,edit.data);
    setEdit({
      dbId:null,
      id: null,
      value: ''
    });
  };
  

  const renderMyTodoList = () => {
    if(Object.keys(todos).filter((val) => {
          if(userId === null)
          return val

          else if (userId === todos[val].userId && todos[val].type !== 'other')
          {
              return val
          }
      }).length > 0){
        $('.myTodo').removeClass('displayNone')
      return Object.keys(todos).filter((val) => {
            if(userId === null)
            return val

            else if (userId === todos[val].userId && todos[val].type !== 'other')
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
            { todos[todo].is_added && <p style={{fontWeight:'450',marginTop:'-15px',textAlign:'left',fontSize:'0.9rem'}}>Accepted By : {todos[todo].reciever_email}</p>}
            <p style={{marginTop:'-12px',textAlign:'left'}}>{todos[todo].createdAt}</p>
          </div>

          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todos[todo].id,todo)}
              className='delete-icon'
            />
            <TiEdit
              onClick={() => setEdit({ id: todos[todo].id, value: todos[todo].text,dbId: todo,data:todos[todo]})}
              className='edit-icon'
            />
              { !todos[todo].isComplete && todos[todo].is_added && <p style={{fontSize:'0.9rem',marginRight:'10px',marginLeft:'10px'}}>Not Completed</p> }
              { todos[todo].isComplete && todos[todo].is_added && <p style={{fontSize:'0.9rem',marginRight:'10px',marginLeft:'10px'}}>Completed</p> }
           
          </div>
        </div>
      )});
    }
    else{
      return <>
      </>
    }
    };

    const renderMyOthersTodoList = () => {
      if(Object.keys(todos).filter((val) => {
        if(userId === null)
        return val

        else if (userId === todos[val].userId && todos[val].type === 'other')
        {
            return val
        }
    }).length > 0){
      $('.myOtherTodo').removeClass('displayNone')
      return Object.keys(todos).filter((val) => {
            if(userId === null)
            return val

            else if (userId === todos[val].userId && todos[val].type === 'other')
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
            <p style={{fontWeight:'450',marginTop:'-15px',textAlign:'left',fontSize:'0.9rem'}}>User Email : {todos[todo].todo_email}</p>
            <p style={{marginTop:'-12px',textAlign:'left',}}>{todos[todo].createdAt}</p>
          </div>

          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todos[todo].id,todo)}
              className='delete-icon'
            />
            {/* <TiEdit
              onClick={() => setEdit({ id: todos[todo].id, value: todos[todo].text,dbId: todo})}
              className='edit-icon'
            /> */}
            {todos[todo].isComplete === false && <div style={{backgroundColor:'#5d0cff',padding:'10px 10px',marginLeft:'15px',cursor:'pointer'}}>
             <TiTick
               onClick={() => completeTodo(todos[todo],todo, todos[todos[todo].todo_uid],todos[todo].todo_uid)}
               className='edit-icon'
            />
            </div>}

            {todos[todo].isComplete === true && <p style={{fontSize:'0.9rem',marginRight:'10px',marginLeft:'10px'}}>Done</p> }

           
          </div>
        </div>
      )});
    }
    else{
      return <>
      </>
    }
    };

    const renderOthersTodoList = () => {
      if(Object.keys(todos).filter((val) => {
        if(userId === null)
        return val

        else if (userId !== todos[val].userId && todos[val].type !== 'other')
        {
            return val
        }
    }).length > 0){
      $('.otherTodo').removeClass('displayNone')
        return Object.keys(todos).filter((val) => {
              if(userId === null)
              return val
  
              else if (userId !== todos[val].userId && todos[val].type !== 'other')
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
              
                <p style={{textAlign:'left'}}>{ todos[todo].text}</p>
                
  
              <p style={{fontWeight:'450',marginTop:'-15px',textAlign:'left',fontSize:'0.9rem'}}>User Email : {todos[todo].email}</p>
              <p style={{fontWeight:'bold',marginTop:'-15px',textAlign:'left'}}>Created At: {todos[todo].createdAt}</p>
            </div>
            <div className='icons'>
              { !todos[todo].is_added && <TiFolderAdd
                onClick={() => addOthersTodo({ id: Math.floor(Math.random() * 10000), text: todos[todo].text,todo_id:todos[todo].id,todo_email: todos[todo].email,todo_uid:todo},todos[todo])}
                className='add-icon'
              />}
              { todos[todo].is_added && <p style={{fontSize:'0.9rem'}}>Added</p> }
              {todos[todo].isComplete === true &&
                <p style={{textAlign:'left',fontSize:'1.2rem',marginTop:'-14px'}}>
                  <>
                    <TiTick style={{marginLeft:'5px',color:'white',fontSize:'1rem',fontWeight:'bold',marginTop:'-3px'}}></TiTick>
                    <span style={{textDecoration:'underline',fontSize:'1rem'}}>Completed</span>
                  </> 
                  </p>
                } 
              
            </div>
          </div>
        )});
        }
      else{
        return <>
        </>
      }

      };
  

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return  (
      <>
      <h2 className="myTodo displayNone" style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px'}}>My Package</h2>
      {renderMyTodoList()}
      <h2 className="myOtherTodo displayNone" style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px',marginTop:'20px'}}>Todo Added From Others List</h2>
      {renderMyOthersTodoList()}
      <h2 className="otherTodo displayNone" style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px',marginTop:'20px'}}>Others Todo List</h2>
      {renderOthersTodoList()}
      </>
  )
}

export default Todo;