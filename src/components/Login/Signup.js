import React from 'react'
import {Link} from 'react-router-dom'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createAccount} from '../../actions/formReducer'
import firebase from '../../firebase'
import history from '../../history'


import '../../assets/css/login.css'



class SignUp extends React.Component {

  componentDidMount(){
    window.scrollTo(0,0)
    this.authListener()
  }

  state = {hasAccount :false,errorMsg : '',isVisible:false, user:null}
  renderError({error,touched})
  {
      if(touched && error)
      {
          return (
              <div className="ui error message">
                  <div className="header">{error}</div>
              </div>
          )
      }
  }

  renderInput = ({input,label,placeholder,meta}) => {
      return (
          <div className="form-group">
              <label className="sr-only">{label}</label>
              <input {...input} autoComplete="off" placeholder={placeholder} className="form-control"/>
             {this.renderError(meta)}
          </div>
      )
  }

  onSubmit = (formValues) => {
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

  handleLogout = () => {
    firebase.auth.logout()
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({hasAccount:true,user:user})
        history.push('/')
      }

      else{
        this.setState({hasAccount:false,user:null })
      }
    })
  }
  render(){
    return (
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0" style={{marginTop:'0px'}}>
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img src="./img/login.jpg" alt="login" className="login-card-img"/>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div className="brand-wrapper">
                    <img src="./img/logo.svg" alt="logo" className="logo"/>
                  </div>
                  <p className="login-card-description">Create your account</p>
                  {this.state.isVisible && <div className="ui error message">
                    <div className="header">{this.state.errorMsg}</div>
                  </div>}
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="email" type="email" component={this.renderInput} label="Enter the Email" placeholder="Email"/>
                    <Field name="password" type="password" component={this.renderInput} label="Enter the Password" placeholder="Password"/>
                    {/* <Field name="cpassword" type="password" component={this.renderInput} label="Renter the Password" placeholder="Confirm Password"/> */}
                    <button className="btn btn-block login-btn mb-4">SignUp</button>
                </form>
                    <a href="/" className="forgot-password-link">Forgot password?</a>
                    <p className="login-card-footer-text">Already have an account? <Link to="/" className="text-reset">Login here</Link></p>
                    <nav className="login-card-footer-nav">
                      {/* <a href="/">Terms of use.</a>
                      <a href="/">Privacy policy</a> */}
                    </nav>
                </div>
              </div>
            </div>
          </div>
          </div>
      </main>
    )
  }
}

const validate = formValues => {
  const errors = {};

  if(!formValues.email)
  {
      errors.email = 'You must enter a email'
  }
   if(!formValues.password)
  {
      errors.password = 'You must enter a password'
  }

  return errors;
}


const reduxForms = reduxForm({
  form:'SignUp',
  validate
})(SignUp);

export default connect(null,{createAccount})(reduxForms)