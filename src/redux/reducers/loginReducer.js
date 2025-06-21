import { LOGIN } from "../actions/loginActions";

const initState = [];

const loginReducer = (state = initState, action) => {

  if (action.type === LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    }
  }
  return state;
};

export default loginReducer;
