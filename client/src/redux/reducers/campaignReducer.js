import {
  ADD_CAMPAIGN_REQUEST,
  ADD_CAMPAIGN_SUCCESS,
  ADD_CAMPAIGN_FAIL,
  GET_CAMPAIGNS_REQUEST,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGN_REQUEST,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_FAIL,
  UPDATE_CAMPAIGN_REQUEST,
  UPDATE_CAMPAIGN_SUCCESS,
  UPDATE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN_REQUEST,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAIL,
  IMPORT_CAMPAIGN_REQUEST,
  IMPORT_CAMPAIGN_SUCCESS,
  IMPORT_CAMPAIGN_FAIL,
} from '../constants/campaignConstants';

export const campaignAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CAMPAIGN_REQUEST:
      return { loading: true };
    case ADD_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case ADD_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const campaignGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CAMPAIGN_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case GET_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const campaignsGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CAMPAIGNS_REQUEST:
      return { loading: true };
    case GET_CAMPAIGNS_SUCCESS:
      return { loading: false, campaigns: action.payload };
    case GET_CAMPAIGNS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const campaignUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case UPDATE_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case UPDATE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const campaignDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CAMPAIGN_REQUEST:
      return { loading: true };
    case DELETE_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case DELETE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const campaignImportReducer = (state = {}, action) => {
  switch (action.type) {
    case IMPORT_CAMPAIGN_REQUEST:
      return { loading: true };
    case IMPORT_CAMPAIGN_SUCCESS:
      return { loading: false, campaign: action.payload };
    case IMPORT_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
