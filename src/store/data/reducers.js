import { actions } from './actions';

let { data, changeLight } = actions;

const sData = JSON.parse(localStorage.getItem('lighting-control')) || { isLoggedIn: false };

const initialState = {
  lights: [
    {
      id: '1',
      type: 'Марка1',
      location: 'Калуга',
      isOn: false,
      manager: 'Менеджер1',
    },
    {
      id: '2',
      type: 'Марка2',
      location: 'Калуга2',
      isOn: false,
      manager: 'Менеджер2',
    },
  ],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case data.toString():
      console.log('act', action);
      return {
        ...state,
        ...action.payload,
      };

    case changeLight.toString():
      console.log('act', action);
      return {
        ...state,
      };

    default:
      return state;
  }
};
