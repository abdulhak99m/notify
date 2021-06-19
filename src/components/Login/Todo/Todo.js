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
            <p style={{textAlign:'left',fontSize:'1.2rem'}}>{todos[todo].text2}</p>
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

   

    

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return  (
      <>
      <h2 className="myTodo displayNone" style={{backgroundColor:'#5d0cff',color:'white',padding:'10px',marginBottom:'15px'}}>Parents Detail</h2>
      {renderMyTodoList()}
     
      </>
  )
}

export default Todo;