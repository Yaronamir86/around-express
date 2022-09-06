// VALIDATION REGEX
const isUrl = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;

// STATUS CODE
const CREATE = 201;
const INVALID_DATA = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// STATUS MESSAGES
const INVALID_DATA_MESSAGE = 'this input is invalid data';
const USER_NOT_FOUND_MESSAGE = 'this user id is not exist';
const CARD_NOT_FOUND_MESSAGE = 'thiS card id is not exist';
const SERVER_ERROR_MESSAGE = 'an error acured with the server';

module.exports = {
  CREATE,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  isUrl,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
