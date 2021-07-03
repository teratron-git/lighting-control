import { takeEvery, call, put, select, delay } from 'redux-saga/effects';
import { actions as logInActions } from './auth/actions';
import { actions as dataActions } from './data/actions';
import * as authConstants from './auth/constants';
import * as dataConstants from './data/constants';

let { logInSuccess, logInFailure, checkIsLogin } = logInActions;
let { updateDataSuccess, allLights } = dataActions;
// let { data } = dataActions;

const stateData = (state) => state;
console.log('🚀 ~ file: sagas.js ~ line 11 ~ stateData', stateData);

export const sendDataToServer = async (url, data) => {
  try {
    data = JSON.stringify(data);
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    });
    let result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Нет соединения с сервером!');
  }
};

export const getDataFromServer = async (url) => {
  try {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Нет соединения с сервером!');
  }
};

export function* rootSaga() {
  yield takeEvery(authConstants.LOGIN, logInSaga);
  yield takeEvery(dataConstants.CHANGE_LIGHT, changeLightSaga);
  yield takeEvery(dataConstants.ADD_LIGHT, addLightSaga);
  yield takeEvery(dataConstants.ALL_LIGHTS, allLightsSaga);
}

function* logInSaga() {
  const data = yield select(stateData);
  const dataAuth = {
    userName: data.auth.userName,
    password: data.auth.password,
  };
  console.log('🚀 ~ file: sagas.js ~ line 55 ~ function*logInSaga ~ dataAuth', dataAuth);
  const urlAuth = 'http://localhost:9999/api/login';

  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result.success) {
      console.log('🚀 ~ file: sagas.js ~ line 65 ~ function*logInSaga ~ result', result);
      yield put(logInSuccess(result));
      yield put(checkIsLogin());
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    yield put(logInFailure(error.message));
  }
}

function* addLightSaga() {
  const data = yield select(stateData);
  const dataAuth = {
    type: data.data.type,
    location: data.data.location,
    isOn: data.data.isOn,
    managerId: data.data.managerId,
    role: data.auth.role,
  };
  console.log('🚀 ~ file: sagas.js ~ line 55 ~ function*logInSaga ~ dataAuth', dataAuth);
  const urlAuth = 'http://localhost:9999/api/data';

  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result) {
      console.log('🚀 ~ file: sagas.js ~ line 65 ~ function*logInSaga ~ result', result);
      yield put(updateDataSuccess(result));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    // yield put(logInFailure(error.message));
  }
}

function* allLightsSaga() {
  const data = yield select(stateData);
  const dataAuth = {
    type: data.data.type,
    location: data.data.location,
    isOn: data.data.isOn,
    managerId: data.data.managerId,
    role: data.auth.role,
  };
  console.log('🚀 ~ file: sagas.js ~ line 55 ~ function*logInSaga ~ dataAuth', dataAuth);
  const urlAuth = 'http://localhost:9999/api/allLights';

  try {
    const result = yield call(getDataFromServer, urlAuth, dataAuth);
    if (result) {
      console.log('🚀 ~ file: sagas.js ~ line 65 ~ function*logInSaga ~ result', result);
      yield put(updateDataSuccess(result));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    // yield put(logInFailure(error.message));
  }
}

// function* changeLightSaga() {
//   let result = {
//     lights: [
//       {
//         id: '1',
//         type: 'Марка1',
//         location: 'Калуга',
//         isOn: true,
//         manager: 'петя',
//       },
//       {
//         id: '2',
//         type: 'Марка2',
//         location: 'Калуга2',
//         isOn: false,
//         manager: 'вася',
//       },
//     ],
//   };
//   console.log('changeLightSaga', result);
//   yield put(data(result));
// }
