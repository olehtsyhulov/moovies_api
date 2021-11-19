require('dotenv').config();
const { REPLACE_QUOT_REG_EXP } = require('../constants/regExp');
const fetch = require('node-fetch');

const getFuncForGetDataTMBD = async (url, payload = {}) => {
  const searchParams = new URLSearchParams({
    ...payload,
    api_key: process.env.TNBD_API_KEY,
  });
  const response = await fetch(`${process.env.TNBD_ROUT}${url}?${searchParams}`);
  return response.json();
};

const replaceAllQuotsForDB = value => (value ? value.replace(REPLACE_QUOT_REG_EXP, '\'\'') : '');

module.exports = {
  getFuncForGetDataTMBD,
  replaceAllQuotsForDB,
};
