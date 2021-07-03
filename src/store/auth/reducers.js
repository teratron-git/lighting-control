import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin, logInErrorReset } = actions;

const sData = JSON.parse(localStorage.getItem('lighting-control')) || { isLoggedIn: false };

const initialState = {
  email: '',
  password: '',
  isLoggedIn: true,
  isLogging: false,
  error: '',
  token: '',
  role: 'user',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case logIn.toString():
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        error: '',
        isLogging: true,
      };

    case logOut.toString():
      localStorage.setItem('lighting-control', JSON.stringify({ isLoggedIn: false }));

      return {
        ...state,
        isLoggedIn: false,
        token: '',
      };

    // case checkIsLogin.toString():
    //   if (sData.isLoggedIn) {
    //     return {
    //       ...state,
    //       isLoggedIn: sData.isLoggedIn,
    //       token: sData.token,
    //     };
    //   }
    //   return state;

    // case logInSuccess.toString():
    //   localStorage.setItem(
    //     'lighting-control',
    //     JSON.stringify({ isLoggedIn: action.payload.success, token: action.payload.token })
    //   );
    //   return {
    //     ...state,
    //     isLoggedIn: action.payload.success,
    //     token: action.payload.token,
    //     isLogging: false,
    //   };

    // case logInFailure.toString():
    //   return {
    //     ...state,
    //     error: action.payload,
    //     isLogging: false,
    //   };

    // case logInErrorReset.toString():
    //   return { ...state, error: '' };

    default:
      return state;
  }
};
