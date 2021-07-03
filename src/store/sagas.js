import { takeEvery, call, put, select, delay } from 'redux-saga/effects';
import { actions as logInActions } from './auth/actions';
import { actions as dataActions } from './data/actions';
import * as authConstants from './auth/constants';
import * as dataConstants from './data/constants';

let { logInSuccess, logInFailure } = logInActions;
let { data } = dataActions;

const stateData = (state) => state;

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
    if (response.ok) {
    }
    return result;
  } catch (error) {
    throw new Error('Нет соединения с сервером!');
  }
};

export const getDataFromServer = async (url) => {
  try {
    let response = await fetch(url);
    let result = await response.json();
    if (response.ok) {
    }
    return result;
  } catch (error) {
    throw new Error('Нет соединения с сервером!');
  }
};

export function* rootSaga() {
  yield takeEvery(authConstants.LOGIN, logInSaga);
  yield takeEvery(dataConstants.CHANGE_LIGHT, changeLightSaga);
}

function* logInSaga() {
  const data = yield select(stateData);
  const dataAuth = {
    email: data.auth.email,
    password: data.auth.password,
  };
  const urlAuth = '../store/logData.js';

  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result.success) {
      yield put(logInSuccess(result));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    yield put(logInFailure(error.message));
  }
}

function* changeLightSaga() {
  let result = {
    lights: [
      {
        id: '1',
        type: 'Марка1',
        location: 'Калуга',
        isOn: true,
        manager: 'петя',
      },
      {
        id: '2',
        type: 'Марка2',
        location: 'Калуга2',
        isOn: false,
        manager: 'вася',
      },
    ],
  };
  console.log('changeLightSaga', result);
  yield put(data(result));
}
