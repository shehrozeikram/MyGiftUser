import {
  SET_CURRENT_LOCATION,
  SET_LICENSE,
  SET_USER_INFO,
  SET_VEHICLE,
  SET_HEADERS,
} from './action-types';
const setHeadersInfo = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_HEADERS,
      payload,
    });
  };
};
const setUserInfo = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};
const setCurrentLocation = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CURRENT_LOCATION,
      payload,
    });
  };
};
const setLicense = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LICENSE,
      payload,
    });
  };
};
const setVehicle = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_VEHICLE,
      payload,
    });
  };
};
export const ACTIONS = {
  setUserInfo,
  setCurrentLocation,
  setLicense,
  setVehicle,
  setHeadersInfo,
};
