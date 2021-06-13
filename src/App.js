import React from 'react'
import {Router,Route,Switch} from 'react-router-dom'
import './App.css'
// import HomePage from './components/Homepage/HomePage'


import history from './history'
// import Login from './components/Login/Login'
import Main from './components/Login/Main'
import Signup from './components/Login/Signup'


const App = () => {
  return (
    <div>
      <Router history={history}>
      <div>
          <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/signup" exact component={Signup}/>
          </Switch>
      </div>
      </Router>
   </div>
  );
}

export default App;
