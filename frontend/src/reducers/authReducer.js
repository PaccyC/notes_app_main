// authReducer.js
const initialState = {
    user: null,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
      case 'LOGIN_SUCCESS':
        localStorage.setItem("token",action.payload.token)
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          error: null,
        };
      case 'SIGNUP_FAILURE':
      case 'LOGIN_FAILURE':
        return {
          ...state,
          user: null,
          token: null,
          error: action.payload.detail,
        };
        case "LOGOUT":
            localStorage.removeItem("token")
            return{
                user:null,
                token:null
            }
      default:
        return state;
    }
  };
  
  export default authReducer;
  