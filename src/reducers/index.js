
import { combineReducers } from 'redux'
import {reducer as forms} from 'redux-form'
import formReducer from './formReducer'


export default combineReducers({
    formData : formReducer,
    form:forms
})