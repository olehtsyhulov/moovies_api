const {
  NAME_REG_EXP,
  PASSWORD_REG_EXP,
  LOGIN_REG_EXP,
  ONLY_WORDS_AND_NUMBERS_REG_EXP,
} = require('../constants/regExp');

const registrationValidation = ({ first_name, last_name, password, login, }) => {
  let result = { isInvalid: false };
  if (!LOGIN_REG_EXP.test(login)) {
    result = {
      ...result,
      isInvalid: true,
      login: 'Login must contains only letters and numbers starts with a letter',
    };
  }
  if (!NAME_REG_EXP.test(first_name)) {
    result = {
      ...result,
      isInvalid: true,
      first_name: 'First Name must contains only letters and have minimum 8 characters',
    };
  }
  if (!NAME_REG_EXP.test(last_name)) {
    result = {
      ...result,
      isInvalid: true,
      last_name: 'Last Name must contains only letters and have minimum 15 characters'
    };
  }
  if (!PASSWORD_REG_EXP.test(password)) {
    result = {
      ...result,
      isInvalid: true,
      password: 'Password must have minimum eight characters, at least one letter and one number',
    };
  }
  return result;
};
const signInValidation = ({ password, login, }) => {
  let result = { isInvalid: false };
  if (!LOGIN_REG_EXP.test(login)) {
    result = {
      ...result,
      isInvalid: true,
      login: 'Login must contains only letters and numbers starts with a letter',
    };
  }
  if (!PASSWORD_REG_EXP.test(password)) {
    result = {
      ...result,
      isInvalid: true,
      password: 'Password must have minimum eight characters, at least one letter and one number',
    };
  }
  return result;
};


const stringValidation = value => {
  if (!value || typeof value !== 'string') return false;
  return ONLY_WORDS_AND_NUMBERS_REG_EXP.test(value);
};

const isValidCreateComment = ({ content, user_id, review_id, isCreate }) => {
  const stateText = isCreate ? 'creating' : 'updating';
  if (!review_id) return { message: `You should pass review_id for ${stateText} review comment`, isInvalid: true };
  if (isCreate && !user_id) return { message: `You should pass user_id for ${stateText} review comment`, isInvalid: true };
  if (!content) return {
    message: `You should pass content for ${stateText} comment and content length more then 10 symbols`,
    isInvalid: true
  };
  return { isInvalid: false };
};

module.exports = {
  registrationValidation,
  stringValidation,
  signInValidation,
  isValidCreateComment,
};
