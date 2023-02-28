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

export const getCountiesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUNTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        counties: action.payload,
      };
    case GET_COUNTIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSubCountiesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUB_COUNTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUB_COUNTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subCounties: action.payload,
      };
    case GET_SUB_COUNTIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getWardsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WARDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        wards: action.payload,
      };
    case GET_WARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
