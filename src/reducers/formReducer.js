
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch(action.type)
    {
        case 'SEND_OTP':
            return {...state, registerForm:action.payload}
        case 'VERIFY_OTP':
            return {...state, registerForm:action.payload}
        case 'CREATE_ACCOUNT':
            return {...state, registerForm:action.payload}
        case 'LOGIN':
            return {...state, registerForm:action.payload}

        default :
            return state
    }
}