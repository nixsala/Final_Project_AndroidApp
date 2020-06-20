import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';
// import trackerApi from '../api/tracker';
import {navigate} from '../routes/navigationRef';

const authURL = '/api/auth';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'get_user':
            return {...state, user: action.payload};
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
        clearErrorMessage,
        tryLocalSignin,
        errorMessage,
        getUser,
    },
    {},
);
