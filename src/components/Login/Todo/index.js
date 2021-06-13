import React, { Component } from 'react'
import TodoList from './TodoList';

export class TodoApp extends Component {
    render() {
        const {user}  = this.props;
        return (
            <div style={{padding:'20px'}}>
               <h5 style={{color:'white',fontWeight:'bold',}}>Hii {user.email}<br/>Welcome to Todo App !</h5>
               <div className='todo-app'>
               <TodoList/>
               </div>
               <a onClick={this.props.onLogoutClick} style={{position:'absolute',right:'10px',color:'white',top:'15px',backgroundColor:'red',padding:'5px',fontWeight:'bold',borderRadius:'5px'}}>Logout</a> 
            </div>
        )
    }
}

export default TodoApp
