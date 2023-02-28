/* eslint-disable consistent-return */
import Axios from 'axios';
import Cookie from 'js-cookie';
import { message } from 'antd';
import {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_FAIL,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  ADD_RECIPIENT_REQUEST,
  ADD_RECIPIENT_SUCCESS,
  ADD_RECIPIENT_FAIL,
  GET_MAIL_LIST_REQUEST,
  GET_MAIL_LIST_SUCCESS,
  GET_MAIL_LIST_FAIL,
  GET_SMS_REPORTS_REQUEST,
  GET_SMS_REPORTS_SUCCESS,
  GET_SMS_REPORTS_FAIL,
  GET_SUBMISSIONS_BY_FORM_REQUEST,
  GET_SUBMISSIONS_BY_FORM_SUCCESS,
  GET_SUBMISSIONS_BY_FORM_FAIL,
  GET_SUPERVISORY_REPORT_REQUEST,
  GET_SUPERVISORY_REPORT_SUCCESS,
  GET_SUPERVISORY_REPORT_FAIL,
  GET_LATE_PMT_REQUEST,
  GET_LATE_PMT_SUCCESS,
  GET_LATE_PMT_FAIL,
  SET_TEST_REPORT,
  GET_TEST_REPORT,
} from '../constants/reportConstants';

const accessToken = Cookie.get('userInfo');

if (accessToken) {
  const parsed = JSON.parse(accessToken);
  Axios.defaults.headers.common.Authorization = parsed?.token;
}

Axios.interceptors.response.use(
  config => config,
  error => {
    message.error(error.message);
    return Promise.reject(error);
  }
);

export const getReports = () => async dispatch => {
  dispatch({ type: GET_REPORTS_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/schedules');
    dispatch({ type: GET_REPORTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REPORTS_FAIL,
      payload: 'Error fetching reports',
    });
  }
};

export const getReport = id => async dispatch => {
  dispatch({ type: GET_REPORT_REQUEST });
  try {
    const { data } = await Axios.get(`/api/v1/schedules/${id}`);
    dispatch({ type: GET_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REPORT_FAIL,
      payload: 'Error fetching report',
    });
  }
};

export const createReport = datas => async dispatch => {
  dispatch({ type: CREATE_REPORT_REQUEST });
  try {
    const { data } = await Axios.post('/api/v1/schedules', datas);
    dispatch({ type: CREATE_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_REPORT_FAIL,
      payload: 'Error creating report',
    });
  }
};

export const updateReport = datas => async dispatch => {
  dispatch({ type: UPDATE_REPORT_REQUEST });
  try {
    const { data } = await Axios.put(
      `/api/v1/schedules/schedule/${datas._id}`,
      datas
    );
    dispatch({ type: UPDATE_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_REPORT_FAIL,
      payload: 'Error updating report',
    });
  }
};

export const deleteReport = id => async dispatch => {
  dispatch({ type: DELETE_REPORT_REQUEST });
  try {
    const { data } = await Axios.delete(`/api/v1/schedules/${id}`);
    dispatch({ type: DELETE_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REPORT_FAIL,
      payload: 'Error deleting report',
    });
  }
};

export const addRecipient = datas => async dispatch => {
  dispatch({ type: ADD_RECIPIENT_REQUEST });
  try {
    const { data } = await Axios.put(
      `/api/v1/schedules/recipient/${datas._id}`,
      datas
    );
    dispatch({ type: ADD_RECIPIENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_RECIPIENT_FAIL,
      payload: 'Error adding recipient',
    });
  }
};

export const getMailList = () => async dispatch => {
  dispatch({ type: GET_MAIL_LIST_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/schedules/mail-list');
    dispatch({ type: GET_MAIL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MAIL_LIST_FAIL,
      payload: 'Error fetching mail list',
    });
  }
};

export const getSmsReports = params => async dispatch => {
  dispatch({ type: GET_SMS_REPORTS_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/pmt', {
      params,
    });
    dispatch({ type: GET_SMS_REPORTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SMS_REPORTS_FAIL,
      payload: 'Error fetching sms reports',
    });
  }
};

export const getSubmissionsByForm = params => async dispatch => {
  dispatch({ type: GET_SUBMISSIONS_BY_FORM_REQUEST });
  try {
    const { data } = await Axios.get(`/api/v1/reports/submissions`, {
      params,
    });
    dispatch({ type: GET_SUBMISSIONS_BY_FORM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUBMISSIONS_BY_FORM_FAIL,
      payload: 'Error fetching submissions by form',
    });
  }
};

export const getSupervisoryReport = params => async dispatch => {
  dispatch({ type: GET_SUPERVISORY_REPORT_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/reports/supervisory', {
      params,
    });
    dispatch({ type: GET_SUPERVISORY_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUPERVISORY_REPORT_FAIL,
      payload: 'Error fetching supervisory report',
    });
  }
};

export const getLatePmt = params => async dispatch => {
  dispatch({ type: GET_LATE_PMT_REQUEST });
  try {
    const { data } = await Axios.get('/api/v1/pmt/latePmt', {
      params,
    });
    dispatch({ type: GET_LATE_PMT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LATE_PMT_FAIL,
      payload: 'Error fetching late pmt',
    });
  }
};

export const setTest = () => async dispatch => {
  const test_yn = localStorage.getItem('test_yn');
  if (test_yn === 'yes' || !test_yn) {
    localStorage.setItem('test_yn', 'no');
    dispatch({ type: SET_TEST_REPORT, payload: 'no' });
  } else {
    localStorage.setItem('test_yn', 'yes');
    dispatch({ type: SET_TEST_REPORT, payload: 'yes' });
  }
};

export const getTest = () => async dispatch => {
  const test_yn = localStorage.getItem('test_yn');
  if (test_yn === 'yes') {
    dispatch({ type: GET_TEST_REPORT, payload: 'yes' });
  } else {
    dispatch({ type: GET_TEST_REPORT, payload: 'no' });
  }
};
