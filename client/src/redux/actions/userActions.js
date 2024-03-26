/* eslint-disable consistent-return */
import Axios from 'axios';
import Cookie from 'js-cookie';
import { message } from 'antd';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_LOGOUT,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  IMPORT_USERS_REQUEST,
  IMPORT_USERS_SUCCESS,
  IMPORT_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants/userConstants';

const accessToken = Cookie.get('userInfo');

if (accessToken) {
  const parsed = JSON.parse(accessToken);
  Axios.defaults.headers.common.Authorization = parsed?.token;
}

Axios.interceptors.response.use(
  config => config,
  error => {
    // message.error(error.message);
    return Promise.reject(error);
  }
);

export const signin = datas => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/users/login', datas);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: 'Please check your username or password',
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: USER_LOGOUT });
  Cookie.remove('userInfo');
};

export const addUser = datas => async dispatch => {
  dispatch({ type: ADD_USER_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/users', datas);
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
    message.success('User added successfully');
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error.message });
  }
};

export const importUsers = datas => async dispatch => {
  dispatch({ type: IMPORT_USERS_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/users/import', datas);
    dispatch({ type: IMPORT_USERS_SUCCESS, payload: data });
    message.success('Users imported successfully');
  } catch (error) {
    dispatch({ type: IMPORT_USERS_FAIL, payload: error.message });
  }
};

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/users');
    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message });
  }
};

export const getUser = id => async dispatch => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await Axios.get(`/api/v1/users/${id}`);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error.message });
  }
};

export const updateUser = datas => async dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const { data } = await Axios.put(`/api/v1/users/${datas._id}`, datas);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    message.success('User updated successfully');
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.message });
  }
};

export const deleteUser = id => async dispatch => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const { data } = await Axios.delete(`/api/v1/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    message.success('User deleted successfully');
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message });
  }
};
