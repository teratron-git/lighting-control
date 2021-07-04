import { actions } from './actions';

let { data, changeLight, addLight, updateDataSuccess, allLights } = actions;
const sData = JSON.parse(sessionStorage.getItem('lighting-control')) || { isLoggedIn: false };

const initialState = {
  id: '',
  type: '',
  location: '',
  isOn: '',
  managerId: '',

  lights: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case data.toString():
      return {
        ...state,
        type: action?.payload?.type,
        location: action?.payload?.location,
        isOn: action?.payload?.isOn,
        managerId: action?.payload?.managerId,
      };

    case allLights.toString():
      return {
        ...state,
        ...action.payload,
      };

    case addLight.toString():
      return {
        ...state,
        type: action.payload.type,
        location: action.payload.location,
        isOn: action.payload.isOn,
        managerId: action.payload.managerId,
      };

    case updateDataSuccess.toString():
      return {
        ...state,
        lights: [...action.payload],
      };

    case changeLight.toString():
      return {
        ...state,
        id: action.payload.id,
        isOn: action.payload.isOn,
      };

    default:
      return state;
  }
};
