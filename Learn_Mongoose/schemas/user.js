const mongoose = require('mongoose');

const { scheme } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // 필수값
    unique: true // 고유값
  },
  age: {
    type: Number,
    required: true
  },
  married: {
    type: Boolean,
    required: true
  },
  comment: String,
  createAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', userSchema);
