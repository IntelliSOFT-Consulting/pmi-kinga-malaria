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

export const getFacilitiesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FACILITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FACILITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        facilities: action.payload,
      };
    case GET_FACILITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        facility: action.payload,
      };
    case ADD_FACILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        facility: action.payload,
      };
    case UPDATE_FACILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        facility: action.payload,
      };
    case DELETE_FACILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const importFacilitiesReducer = (state = {}, action) => {
  switch (action.type) {
    case IMPORT_FACILITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IMPORT_FACILITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        facilities: action.payload,
      };
    case IMPORT_FACILITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
