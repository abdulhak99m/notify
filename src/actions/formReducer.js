import axios from 'axios'
import history from '../history'

export const sendOtp = (formValues) => async disptach => {
    
    // let response = await axios.post(
    //     'http://localhost:4000/api/send-otp',
    //     {phone:formValues,channel:'sms'
    // })

     let response = await axios.get('http://localhost:4000/api/getUser',{withCredentials:true})

    console.log(response)

    disptach({
        type:'SEND_OTP',
        payload:response.data
    })

    if(response.data.status)
    history.push('/verify')

    else
    history.push('/register')
    
}

export const verifyOtp = (formValues) => async (disptach, getState) => {
    
    const phone = getState().formData.registerForm.phone;

    let response = await axios.post(
        'http://localhost:4000/api/verify-otp',
        {...formValues,phone:phone
    })
    
    // let response = await axios.get(
    //     'http://localhost:4000/api/logout',{withCredentials:true})

    console.log(response)

    disptach({
        type:'VERIFY_OTP',
        payload:response.data
    })

    if(response.data.status)
    history.push('/signup')

    else
    history.push('/verify')
    
}

export const createAccount = (formValues) => async (disptach, getState) => {
    
   console.log(formValues)

    let response = await axios.post(
        'http://localhost:4000/api/create-account',formValues)

    console.log(response)

    disptach({
        type:'CREATE_ACCOUNT',
        payload:response.data
    })

    if(response.data.status)
    history.push('/login')

    else
    history.push('/signup')
    
}

export const login = (formValues) => async disptach => {
    
    let response = await axios.post(
        'http://localhost:4000/api/create-session',
        formValues,{withCredentials:true})

    console.log(response,formValues)

    disptach({
        type:'LOGIN',
        payload:response.data
    })

    if(response.data.status)
    history.push('/')

    else
    history.push('/login')
    
}