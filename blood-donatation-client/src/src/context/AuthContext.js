import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';
// import trackerApi from '../api/tracker';
import {navigate} from '../routes/navigationRef';
import moment, {now} from 'moment';
import {split, Syntax} from 'sentence-splitter';

const authURL = '/api/auth';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'get_user':
      return {...state, user: action.payload};
    case 'get_user_list':
      return {...state, userList: action.payload};
    case 'get_driver_list':
      return {...state, driverList: action.payload};
    case 'get_donar_list':
      return {...state, donarList: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, role: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    roleScreen(token);
  } else {
    navigate('SignIn');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async (data) => {
  try {
    const response = await jsonServer.post(`${authURL}/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      age: data.age,
      bloodType: data.bloodType,
      donate: data.donate,
    });

    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('ID', response.data.user.id);
    await roleScreen(response.data.token);
    await dispatch({type: 'signin', payload: response.data.token});
  } catch (err) {
    await console.log(err.data.message);
    await dispatch({
      type: 'add_error',
      payload: err.response.data.message,
    });
  }
};

const driverRegister = (dispatch) => async (data) => {
  try {
    const response = await jsonServer.post(`${authURL}/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      age: data.age,
      bloodType: data.bloodType,
      donate: data.donate,
    });
  } catch (err) {
    await console.log(err.data.message);
    await dispatch({
      type: 'add_error',
      payload: err.response.data.message,
    });
  }
};

const signin = (dispatch) => {
  return async (data) => {
    try {
      const response = await jsonServer.post('/api/auth/signin', {
        email: data.email,
        password: data.password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('ID', response.data.user.id);
      await roleScreen(response.data.token);
      await dispatch({type: 'signin', payload: response.data.token});
    } catch ({err, response}) {
      dispatch({
        type: 'add_error',
        // payload: err.response.data.message,
        payload: response.data,
      });
    }
  };
};

const roleScreen = async (token) => {
  const response = await jsonServer.post(
    `${authURL}/resolve`,
    {
      token: token,
    },
    {headers: {Authorization: `Bearer ${token}`}},
  );
  const id = response.data.id;
  if (response.data.role === 'user') {
    navigate('userFlow');
  } else if (response.data.role === 'driver') {
    navigate('driverFlow');
  } else if (response.data.role === 'admin') {
    navigate('adminFlow');
  }
  console.log(response.data.id);
};

const getUserList = (dispatch) => {
  return async (donate, verifyUser, bloodType, age) => {
    const response = await jsonServer.get('/api/users');

    if ((age, verifyUser, bloodType)) {
      const filter = await response.data.filter(
          (data) =>
              data.bloodType === bloodType && data.verifyUser !== verifyUser,
      );
      await dispatch({type: 'get_user_list', payload: filter});
    } else if ((donate, verifyUser)) {
      const filter = await response.data.filter(
          (data) => data.donate === donate && data.verifyUser === verifyUser,
      );
      await dispatch({type: 'get_user_list', payload: filter});
    } else if (bloodType) {
      await console.log('rav1');
      const filter = await response.data.filter(
          (data) => data.bloodType === bloodType,
      );
      await dispatch({type: 'get_user_list', payload: filter});
    } else if (age) {
      await console.log('rav1');
      const filter = await response.data.filter((data) => data.age === age);
      await dispatch({type: 'get_user_list', payload: filter});
    } else {
      await console.log('rav3');
      await dispatch({type: 'get_user_list', payload: response.data});
    }
  };
};

const donarList = (dispatch) => {
  return async (bloodGroup, accidentUserID) => {
    await console.log('donarList');
    const response = await jsonServer.get('api/users');

    const filterData = await response.data.filter(
        (data) => data.donate === 'true' && data.verifyUser === 'true',
    );
    const removeCurrentUser = await filterData.filter((item) => {
      const condition = item.id;
      return condition !== accidentUserID;
    });

    const validDonar = await removeCurrentUser.filter((item) => {
      const condition = moment(item.donateDate).isBefore(
          moment(now()).subtract(6, 'month'),
      );
      const condition2 = item.donateDate;
      return condition === true || condition2 === null;
    });
    await console.log({bloodGroup});
    const matchGroup = await validDonar.filter((item) => {
      if (bloodGroup === 'B-') {
        return item.bloodType === 'O-' || item.bloodType === 'B-';
      } else if (bloodGroup === 'B+') {
        return (
            item.bloodType === 'O-' ||
            item.bloodType === 'B+' ||
            item.bloodType === 'B-' ||
            item.bloodType === 'O+'
        );
      } else if (bloodGroup === 'A-') {
        return item.bloodType === 'A-' || item.bloodType === 'O-';
      } else if (bloodGroup === 'A+') {
        return (
            item.bloodType === 'A-' ||
            item.bloodType === 'A+' ||
            item.bloodType === 'O-' ||
            item.bloodType === 'O+'
        );
      } else if (bloodGroup === 'O-') {
        return item.bloodType === 'O-';
      } else if (bloodGroup === 'O+') {
        return item.bloodType === 'O-' || item.bloodType === 'O+';
      } else if (bloodGroup === 'AB-') {
        return (
            item.bloodType === 'AB-' ||
            item.bloodType === 'O-' ||
            item.bloodType === 'B-' ||
            item.bloodType === 'A-'
        );
      } else {
        return item;
      }
    });
    await console.log(matchGroup);

    await dispatch({type: 'get_donar_list', payload: matchGroup});
  };
};

const getDriverList = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('api/users');
    const filter = await response.data.filter(
        (data) => data.role.name == 'driver',
    );
    await dispatch({type: 'get_driver_list', payload: filter});
  };
};

const editUser = (dispatch) => {
  return async (id, status) => {
    await jsonServer.put(`api/users/${id}`, {verifyUser: status});
  };
};

const editDonateDate = (dispatch) => {
  return async (id, date) => {
    await jsonServer.put(`api/users/${id}`, {donateDate: date});
  };
};

const getUser = (dispatch) => {
  return async (ID) => {
    const response = await jsonServer.get(`/api/users/${ID}`);
    dispatch({type: 'get_user', payload: response.data});
  };
};

const errorMessage = (dispatch) => ({error}) => {
  dispatch({
    type: 'add_error',
    payload: error,
  });
};
const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('role');
  dispatch({type: 'signout'});
  navigate('SignIn');
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {
      signin,
      signout,
      signup,
      getDriverList,
      donarList,
      driverRegister,
      editUser,
      getUserList,
      clearErrorMessage,
      tryLocalSignin,
      errorMessage,
      editDonateDate,
      getUser,
    },
    {token: null, errorMessage: ''},
);
