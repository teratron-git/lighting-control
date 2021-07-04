import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
  data: createAction(constants.DATA),
  allLights: createAction(constants.ALL_LIGHTS),
  changeLight: createAction(constants.CHANGE_LIGHT),
  addLight: createAction(constants.ADD_LIGHT),
  updateDataSuccess: createAction(constants.UPDATE_DATA_SUCCESS),
};
