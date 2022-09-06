const mongoose = require('mongoose');

const { isUrl } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the "name" field must be filled in'],
    minlength: [2, 'the minimum length of the "name" field is 2'],
    maxlength: [30, 'the maximum length of the "name" field is 30'],
  },
  about: {
    type: String,
    minlength: [2, 'the minimum length of the "about" field is 2'],
    maxlength: [30, 'the maximum length of the "about" field is 30'],
    required: [true, 'the "about" field must be filled in'],
  },
  avatar: {
    type: String,
    required: [true, 'the "avatar" field must be filled in'],
    validate: {
      validator: (v) => isUrl.test(v),
    },
  },
},
);

module.exports = mongoose.model('user', userSchema);
