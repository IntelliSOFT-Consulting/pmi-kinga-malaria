import Axios from 'axios';
import Cookie from 'js-cookie';
import { message } from 'antd';
import {
  GET_FACILITIES_REQUEST,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAILURE,
  ADD_FACILITY_REQUEST,
  ADD_FACILITY_SUCCESS,
  ADD_FACILITY_FAILURE,
  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITY_SUCCESS,
  UPDATE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_FAILURE,
  IMPORT_FACILITIES_REQUEST,
  IMPORT_FACILITIES_SUCCESS,
  IMPORT_FACILITIES_FAILURE,
} from '../constants/facilityConstants';

const accessToken = Cookie.get('userInfo');

if (accessToken) {
  const parsed = JSON.parse(accessToken);
  Axios.defaults.headers.common.Authorization = parsed?.token;
}

export const getFacilities = () => async dispatch => {
  dispatch({ type: GET_FACILITIES_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/org-units');
    dispatch({ type: GET_FACILITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FACILITIES_FAILURE,
      payload: 'Error fetching facilities',
    });
  }
};

export const addFacility = datas => async dispatch => {
  dispatch({ type: ADD_FACILITY_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/org-units', datas);
    dispatch({ type: ADD_FACILITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FACILITY_FAILURE,
      payload: 'Error adding facility',
    });
  }
};

export const updateFacility = datas => async dispatch => {
  dispatch({ type: UPDATE_FACILITY_REQUEST });
  try {
    const { data } = await Axios.put(`/api/v1/org-units/${datas._id}`, datas);
    dispatch({ type: UPDATE_FACILITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FACILITY_FAILURE,
      payload: 'Error updating facility',
    });
  }
};

export const deleteFacility = id => async dispatch => {
  dispatch({ type: DELETE_FACILITY_REQUEST });
  try {
    const { data } = await Axios.delete(`/api/v1/org-units/${id}`);
    dispatch({ type: DELETE_FACILITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_FACILITY_FAILURE,
      payload: 'Error deleting facility',
    });
  }
};

export const importFacilities = datas => async dispatch => {
  dispatch({ type: IMPORT_FACILITIES_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/org-units/import', datas);
    dispatch({ type: IMPORT_FACILITIES_SUCCESS, payload: data });
    if (data) {
      message.success('Facilities imported successfully');
    }
  } catch (error) {
    dispatch({
      type: IMPORT_FACILITIES_FAILURE,
      payload: 'Error importing facilities',
    });
  }
};
