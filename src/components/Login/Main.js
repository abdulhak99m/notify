import React from 'react'
import firebase from '../../firebase'
import history from '../../history'

import '../../assets/css/login.css'
import Signup from './Signup'
import Login from './Login'
import TodoApp from './Todo'
import Loader from './Loader'



class Main extends React.Component {

  componentDidMount(){
      window.scrollTo(0,0)
    this.authListener()
  }

  componentDidUpdate(){
    window.scrollTo(0,0)
  }

  state = {hasAccount :null,errorMsg : '',isVisible:false, user:null}

  onSignUpSubmit = (formValues) => {
    this.setState({errorMsg:'',isVisible:false})
    const email = formValues.email;
    const password = formValues.password;
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(data => {
        history.push('/')
    })
    .catch(err => {
      switch(err.code)
      {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/user-not-found':
          this.setState({errorMsg:err.message, isVisible:true})
          break;
        case 'auth/weak-password':
          this.setState({errorMsg:err.message, isVisible:true})
          break;

      }
    })
  }

  onLoginSubmit = (formValues) => {
    this.setState({errorMsg:'',isVisible:false})
    const email = formValues.email;
    const password = formValues.password;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code)
      {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          this.setState({errorMsg:err.message, isVisible:true})
          break;
        case 'auth/wrong-password':
          this.setState({errorMsg:err.message, isVisible:true})
          break;

      }
    })
  }

  handleLogout = () => {
    firebase.auth().signOut()
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({hasAccount:true,user:user})

      }

      else{
        this.setState({hasAccount:false,user:null })
      }
    })
  }
  render(){
    return (
        <>
            {this.state.hasAccount == null && <Loader/>} 
            {this.state.hasAccount == false && <Login onSubmit={this.onLoginSubmit} isVisible={this.state.isVisible} errorMsg={this.state.errorMsg}/>}
            {this.state.hasAccount && <TodoApp user={this.state.user} onLogoutClick={this.handleLogout}/>}
        </>
    )
  }
}






export default Main