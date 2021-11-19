/* eslint-disable max-len */
const NAME_REG_EXP = /(^[A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14}$)/;
const ONLY_WORDS_AND_NUMBERS_REG_EXP = /(^(?!!@#\$%\^&.*\(\)\+=``~:;''""$)([A-Za-z]{1}([a-z]{0,14})?([0-9]{0,9})?([A-Z]{0,1})?([a-z]{0,14})?( [A-Z]{1})?([a-z]{1})?)$)|(^[А-Яа-я]{1}([а-я]{0,14})?([0-9]{0,9})?([А-Я]{0,1})?([а-я]{0,14})?( [А-Я]{1})?([а-я]{1})?$)/;
const LOGIN_REG_EXP = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/;
//Minimum eight characters, at least one letter and one number:
const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const REPLACE_QUOT_REG_EXP = new RegExp('\'', 'g');

module.exports = {
  NAME_REG_EXP,
  ONLY_WORDS_AND_NUMBERS_REG_EXP,
  PASSWORD_REG_EXP,
  LOGIN_REG_EXP,
  REPLACE_QUOT_REG_EXP,
};
