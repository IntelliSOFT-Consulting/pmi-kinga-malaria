import { config } from 'dotenv';

config();

export const flattenObject = obj => {
  if (!obj) return {};
  if (typeof obj !== 'object') return obj;
  return Object.keys(obj).reduce((acc, key) => {
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const removeEmpty = arr => {
  return arr.filter(
    item =>
      item?.name && item?.type !== 'begin group' && item?.type !== 'end group'
  );
};

export const deepFlattenArray = arr => {
  return [].concat(
    ...arr.map(v => (Array.isArray(v) ? deepFlattenArray(v) : v))
  );
};

export const getAverage = (total, count) => {
  return Math.ceil(total / count);
};

export const percentage = (total = 0, count = 0) => {
  const percentage = ((total / count) * 100)?.toFixed(1);
  return (
    (isNaN(percentage) || !isFinite(percentage) ? '0' : percentage.toString()) +
    '%'
  );
};

export const uniqueLocations = (reports, level) => {
  const facilities = reports.map(report => report[level]?.name);
  return [...new Set(facilities)];
};

export const getLocationReport = (reports, level, levelName) => {
  return reports.filter(report => report[level]?.name === levelName);
};

export const getTotalOf = (reports, key) => {
  return reports.map(report => report[key]).reduce((a, b) => a + b, 0);
};

export const getCummulative = (value, total) => {
  return `${percentage(value, total)} (${value}/${total})`;
};

export const getLastSaturdayDate = () => {
  const today = new Date();
  const lastSaturday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  return lastSaturday;
};

export const filterTestSubmissions = (submissions, isTest) => {
  let isTesting = isTest === 'yes' ? 'no' : 'yes';
  return submissions.filter(item => item.test_yn === isTesting);
};

export const getProjectId = isTest => {
  return isTest == 'yes'
    ? process.env.CENTRAL_PROJECT_TEST_ID
    : process.env.CENTRAL_PROJECT_ID;
};
