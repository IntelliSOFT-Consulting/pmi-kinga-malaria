import Axios from 'axios';
import Cookie from 'js-cookie';
import { message } from 'antd';
import {
  GET_COUNTIES_REQUEST,
  GET_COUNTIES_SUCCESS,
  GET_COUNTIES_FAILURE,
  GET_SUB_COUNTIES_REQUEST,
  GET_SUB_COUNTIES_SUCCESS,
  GET_SUB_COUNTIES_FAILURE,
  GET_WARDS_REQUEST,
  GET_WARDS_SUCCESS,
  GET_WARDS_FAILURE,
} from '../constants/countyConstants';

const accessToken = Cookie.get('userInfo');

if (accessToken) {
  const parsed = JSON.parse(accessToken);
  Axios.defaults.headers.common.Authorization = parsed?.token;
}

export const getCounties = () => async dispatch => {
  dispatch({ type: GET_COUNTIES_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/counties');
    dispatch({ type: GET_COUNTIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COUNTIES_FAILURE,
      payload: 'Error processing your request',
    });
  }
};

export const getSubCounties = countyId => async dispatch => {
  dispatch({ type: GET_SUB_COUNTIES_REQUEST });
  try {
    const { data } = await Axios.get(`/api/v1/counties/subCounties`, {
      params: {
        county: countyId,
      },
    });
    dispatch({ type: GET_SUB_COUNTIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUB_COUNTIES_FAILURE,
      payload: 'Error processing your request',
    });
  }
};

export const getWards = subCountyId => async dispatch => {
  dispatch({ type: GET_WARDS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/v1/counties/wards`, {
      params: {
        subCounty: subCountyId,
      },
    });
    dispatch({ type: GET_WARDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WARDS_FAILURE,
      payload: 'Error processing your request',
    });
  }
};
