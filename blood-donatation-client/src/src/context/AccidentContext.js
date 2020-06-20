import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';
// import trackerApi from '../api/tracker';
import {navigate} from '../routes/navigationRef';

const authURL = '/api/auth';

const accidentReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'get_accident':
      return action.payload;
      // case 'edit_accident':
      //   return state.map((accident) => {
      //     return accident.id === action.payload.id ? action.payload : accident;
      //   });
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, role: null, errorMessage: ''};
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const getAccidentByUser = (dispatch) => {
  return async (ID, status) => {
    await console.log({ID});
    const response = await jsonServer.get(`api/accidents?&accidentUser=${ID}`);

    if (status) {
      const filter = await response.data.filter(
          (data) => data.status == status,
      );
      await dispatch({type: 'get_accident', payload: filter});
    } else {
      await dispatch({type: 'get_accident', payload: response.data});
    }
  };
};

const getAccidentDetail = (dispatch) => {
  return async (id) => {
    const response = await jsonServer.get(`api/accident/${id}`);
    await dispatch();
  };
};

const getAllAccident = (dispatch) => {
  return async (status) => {
    const response = await jsonServer.get('api/accident');
    if (status) {
      const filter = await response.data.filter(
          (data) => data.status == status,
      );
      await dispatch({type: 'get_accident', payload: filter});
    } else {
      await dispatch({type: 'get_accident', payload: response.data});
    }
  };
};

const editAccident = (dispatch) => {
  return async (id, status) => {
    // await jsonServer.put(`api/accident/${id}`, {status});
    await jsonServer.put(`api/accident/${id}`, {status: status});
  };
};

const editAccidentDonar = (dispatch) => {
  return async (id, accidentUser) => {
    await console.log({id});
    await console.log({accidentUser});
    await jsonServer.put(`api/accident/${id}`, {donarUser: accidentUser});
  };
};

const addAccident = (dispatch) => {
  return async (latitude, longitude, user, description) => {
    const response = await jsonServer.post('/api/accident', {
      user: user,
      latitude: latitude,
      longitude: longitude,
      accidentUser: user,
      description: description,
    });
    await dispatch({type: 'get_accident', payload: response.data});
  };
};

const errorMessage = (dispatch) => ({error}) => {
  dispatch({
    type: 'add_error',
    payload: error,
  });
};

export const {Provider, Context} = createDataContext(
    accidentReducer,
    {
      addAccident,
      getAccidentByUser,
      clearErrorMessage,
      errorMessage,
      getAllAccident,
      editAccident,
      editAccidentDonar,
    },
    {},
);
