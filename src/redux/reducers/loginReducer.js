import { LOGIN, LOGOUT } from "../actions/loginActions";

const initState = [];

const loginReducer = (state = initState, action) => {

  if (action.type === LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    }
  } 
  
  if (action.type === LOGOUT) {
    return {
      ...state,
      user: null,
      token: null,
    }
  }

  // If the action type does not match, return the current state
  return state;
};

export default loginReducer;
