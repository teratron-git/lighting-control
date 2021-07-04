import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin, logInErrorReset } = actions;
const sData = JSON.parse(sessionStorage.getItem('lighting-control')) || { isLoggedIn: false };

const initialState = {
  id: '',
  userName: '',
  password: '',
  isLoggedIn: false,
  isLogging: false,
  error: '',
  token: '',
  role: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case logIn.toString():
      return {
        ...state,
        userName: action.payload.userName,
        password: action.payload.password,
        error: '',
        isLogging: true,
      };

    case logOut.toString():
      sessionStorage.setItem('lighting-control', JSON.stringify({ isLoggedIn: false }));

      return {
        ...state,
        isLoggedIn: false,
        token: '',
        role: '',
      };

    case checkIsLogin.toString():
      if (sData.isLoggedIn) {
        return {
          ...state,
          id: state.id || sData.id,
          userName: state.userName || sData.userName,
          isLoggedIn: state.isLoggedIn || sData.isLoggedIn,
          token: sData.token,
          role: state.role || sData.role,
        };
      }
      return state;

    case logInSuccess.toString():
      sessionStorage.setItem(
        'lighting-control',
        JSON.stringify({
          isLoggedIn: true,
          token: action.payload.token,
          id: action.payload.id,
          userName: action.payload.userName,
          role: action.payload.role,
        })
      );
      return {
        ...state,
        id: action.payload.id,
        userName: action.payload.userName,
        role: action.payload.role,
        isLoggedIn: true,
        token: action.payload.token,
        isLogging: false,
      };

    case logInFailure.toString():
      return {
        ...state,
        error: action.payload,
        isLogging: false,
      };

    case logInErrorReset.toString():
      return { ...state, error: '' };

    default:
      return state;
  }
};
