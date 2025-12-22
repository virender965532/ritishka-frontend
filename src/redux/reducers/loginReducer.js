import { LOGIN, LOGOUT } from "../actions/loginActions";

const initState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload.user,
        token: action.payload.token,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return initState;

    default:
      return state;
  }
};

export default loginReducer;
