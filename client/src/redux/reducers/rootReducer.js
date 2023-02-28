import { combineReducers } from 'redux';
import {
  userSigninReducer,
  userAddReducer,
  userImportReducer,
  usersGetReducer,
  userGetReducer,
  userUpdateReducer,
  userDeleteReducer,
} from './userReducers';
import {
  getReportsReducer,
  getReportReducer,
  updateReportReducer,
  createReportReducer,
  deleteReportReducer,
  addRecipientReducer,
  getMailListReducer,
  getSmsReportsReducer,
  getSubmissionsByFormReducer,
  getSupervisoryReportReducer,
  getLatePmtReducer,
  setTestReportReducer,
  getTestReportReducer,
} from './reportReducer';
import {
  getFacilitiesReducer,
  addFacilityReducer,
  updateFacilityReducer,
  deleteFacilityReducer,
  importFacilitiesReducer,
} from './facilityReducer';
import {
  getCountiesReducer,
  getSubCountiesReducer,
  getWardsReducer,
} from './countyReducer';

import {
  campaignAddReducer,
  campaignGetReducer,
  campaignsGetReducer,
  campaignUpdateReducer,
  campaignDeleteReducer,
  campaignImportReducer,
} from './campaignReducer';

const reducer = combineReducers({
  userSignin: userSigninReducer,
  addUser: userAddReducer,
  importUsers: userImportReducer,
  getUsers: usersGetReducer,
  getUser: userGetReducer,
  updateUser: userUpdateReducer,
  deleteUser: userDeleteReducer,
  getReports: getReportsReducer,
  getReport: getReportReducer,
  updateReport: updateReportReducer,
  createReport: createReportReducer,
  deleteReport: deleteReportReducer,
  addRecipient: addRecipientReducer,
  getMailList: getMailListReducer,
  getSmsReports: getSmsReportsReducer,
  getSubmissionsByForm: getSubmissionsByFormReducer,
  getSupervisoryReport: getSupervisoryReportReducer,
  getLatePmt: getLatePmtReducer,
  getFacilities: getFacilitiesReducer,
  addFacility: addFacilityReducer,
  updateFacility: updateFacilityReducer,
  deleteFacility: deleteFacilityReducer,
  importFacilities: importFacilitiesReducer,
  getCounties: getCountiesReducer,
  getSubCounties: getSubCountiesReducer,
  getWards: getWardsReducer,
  addCampaign: campaignAddReducer,
  getCampaign: campaignGetReducer,
  getCampaigns: campaignsGetReducer,
  updateCampaign: campaignUpdateReducer,
  deleteCampaign: campaignDeleteReducer,
  importCampaign: campaignImportReducer,
  setTestReport: setTestReportReducer,
  getTestReport: getTestReportReducer,
});

export default reducer;
