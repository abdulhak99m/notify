import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/formReducer'
import {Field,reduxForm} from 'redux-form';
import '../../assets/css/login.css'



class Login extends React.Component {



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
    this.props.onSubmit(formValues);
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
                  <p className="login-card-description">Sign into your account</p>
                  {this.props.isVisible && <div className="ui error message">
                    <div className="header">{this.props.errorMsg}</div>
                  </div>}
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="email" type="email" component={this.renderInput} label="Enter the Email" placeholder="Email"/>
                    <Field name="password" type="password" component={this.renderInput} label="Enter the Password" placeholder="Password"/>
                    <button className="btn btn-block login-btn mb-4">Login</button>
                </form>
                    <p className="login-card-footer-text">Don't have an account? <Link to="/signup" className="text-reset">Register here</Link></p>
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
      errors.phone = 'You must enter a password'
  }

  return errors;
}


const reduxForms = reduxForm({
  form:'Login',
  validate
})(Login);

export default connect(null,{login})(reduxForms)