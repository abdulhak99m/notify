import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './App';
import './assets/css/animate.min.css'
import './assets/css/aos.css'
import './assets/css/bootstrap.min.css'
import './assets/css/glightbox.min.css'
import './assets/css/swiper-bundle.min.css'
import './assets/css/style.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);


