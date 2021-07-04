import { call, put, select, takeEvery } from 'redux-saga/effects';
import { serv } from '../server';
import { actions as logInActions } from './auth/actions';
import * as authConstants from './auth/constants';
import { actions as dataActions } from './data/actions';
import * as dataConstants from './data/constants';

let { logInSuccess, logInFailure, checkIsLogin } = logInActions;
let { updateDataSuccess } = dataActions;

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

  const urlAuth = `${serv}/api/login`;
  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result.success) {
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

  const urlAuth = `${serv}/api/data`;
  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result) {
      yield put(updateDataSuccess(result));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.log(error.message);
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

  const urlAuth = `${serv}/api/allLights`;
  try {
    const result = yield call(getDataFromServer, urlAuth, dataAuth);
    if (result) {
      yield put(updateDataSuccess(result));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* changeLightSaga() {
  const data = yield select(stateData);
  const dataAuth = {
    id: data.data.id,
    isOn: data.data.isOn,
  };

  const urlAuth = `${serv}/api/changeLight`;
  try {
    const result = yield call(sendDataToServer, urlAuth, dataAuth);
    if (result.success) {
      yield put(logInSuccess(result));
      yield put(checkIsLogin());
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.log(error.message);
  }
}
