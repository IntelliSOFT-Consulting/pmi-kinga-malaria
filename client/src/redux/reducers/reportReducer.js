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

export const getReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REPORTS_REQUEST:
      return { loading: true };
    case GET_REPORTS_SUCCESS:
      return { loading: false, reports: action.payload };
    case GET_REPORTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return { loading: true };
    case GET_REPORT_SUCCESS:
      return { loading: false, report: action.payload };
    case GET_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createReportReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REPORT_REQUEST:
      return { loading: true };
    case CREATE_REPORT_SUCCESS:
      return { loading: false, report: action.payload };
    case CREATE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateReportReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REPORT_REQUEST:
      return { loading: true };
    case UPDATE_REPORT_SUCCESS:
      return { loading: false, report: action.payload };
    case UPDATE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReportReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REPORT_REQUEST:
      return { loading: true };
    case DELETE_REPORT_SUCCESS:
      return { loading: false, report: action.payload };
    case DELETE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addRecipientReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPIENT_REQUEST:
      return { loading: true };
    case ADD_RECIPIENT_SUCCESS:
      return { loading: false, report: action.payload };
    case ADD_RECIPIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMailListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MAIL_LIST_REQUEST:
      return { loading: true };
    case GET_MAIL_LIST_SUCCESS:
      return { loading: false, mailList: action.payload };
    case GET_MAIL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSmsReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SMS_REPORTS_REQUEST:
      return { loading: true };
    case GET_SMS_REPORTS_SUCCESS:
      return { loading: false, smsReports: action.payload };
    case GET_SMS_REPORTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubmissionsByFormReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBMISSIONS_BY_FORM_REQUEST:
      return { loading: true };
    case GET_SUBMISSIONS_BY_FORM_SUCCESS:
      return { loading: false, submissions: action.payload };
    case GET_SUBMISSIONS_BY_FORM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSupervisoryReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUPERVISORY_REPORT_REQUEST:
      return { loading: true };
    case GET_SUPERVISORY_REPORT_SUCCESS:
      return { loading: false, supervisoryReport: action.payload };
    case GET_SUPERVISORY_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getLatePmtReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LATE_PMT_REQUEST:
      return { loading: true };
    case GET_LATE_PMT_SUCCESS:
      return { loading: false, latePmt: action.payload };
    case GET_LATE_PMT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setTestReportReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TEST_REPORT:
      return { testReport: action.payload };
    default:
      return state;
  }
};

export const getTestReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEST_REPORT:
      return { testReport: action.payload };
    default:
      return state;
  }
};
