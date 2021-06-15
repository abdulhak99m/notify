import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import {db} from '../../../firebase'
import firebase from '../../../firebase'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todosList, setTodosList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    authListener()
},[])


  useEffect(() => {
      db.child('todos').on('value',snapshot => {
          if(snapshot.val() != null)
          {
            setTodosList({...snapshot.val()})
          }
      })
  },[])

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
       setUserId(user.uid)
       setUserEmail(user.email)
      }

      else{
        setUserId(null)
        setUserEmail(null)
      }
    })
  }

  

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    let date = new Date().toDateString();
    console.log(date)

    db.child('todos').push(
        {...todo,userId:userId,email:userEmail,isComplete:false,createdAt:date},err => {
            if(err)
            console.log(err)
        }
    )

    // const newTodos = [todo, ...todos];

    // setTodos(newTodos);
  };

  const addOthersTodo = (todo, data) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    let date = new Date().toDateString();
    console.log(date)

    db.child('todos').push(
        {...todo,userId:userId,email:userEmail,isComplete:false,createdAt:date,type:'other'},err => {
            if(err)
            console.log(err)
        }
    )

    db.child(`todos/${todo.todo_uid}`).set(
      {...data,reciever_id:todo.id,reciever_email:userEmail,is_added:true},err => {
          if(err)
          console.log(err)
      }
  )

    // const newTodos = [todo, ...todos];

    // setTodos(newTodos);
  };
  const updateTodo = (todoId, newValue,dbId) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let date = new Date();
    db.child(`todos/${dbId}`).set(
        {...newValue,userId:userId,email:userEmail,date:date},err => {
            if(err)
            console.log(err)
        }
    )
    
    
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id,dbId) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    
    db.child(`todos/${dbId}`).remove(err => {
            if(err)
            console.log(err)
        }
    )
    // setTodos(removedArr);
  };

  const completeTodo = (newValue,dbId,user,uId) => {
    let date = new Date();

    db.child(`todos/${dbId}`).set(
        {...newValue,isComplete:true},err => {
            if(err)
            console.log(err)
        }
    )
    db.child(`todos/${uId}`).set(
      {...user,isComplete:true},err => {
          if(err)
          console.log(err)
      }
  )

    // let updatedTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.isComplete = !todo.isComplete;
    //   }
    //   return todo;
    // });
    // setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Post your Package</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todosList}
        userId={userId}
        addTodo={addTodo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        addOthersTodo={addOthersTodo}
      />
    </>
  );
}

export default TodoList;