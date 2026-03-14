const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-Binary'],
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  sleepCycles: {
    type: Number,
  },
  experienceLevel: {
    type: String,
    enum: ['BEGINNER', 'INTERMED', 'ADVANCED'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
