import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
  data: createAction(constants.DATA),
  changeLight: createAction(constants.CHANGE_LIGHT),
};
console.log('🚀 ~ file: actions.js ~ line 6 ~ data', actions.data.payload);
console.log('🚀 ~ file: actions.js ~ line 7 ~ changeLight', actions.changeLight.payload);
