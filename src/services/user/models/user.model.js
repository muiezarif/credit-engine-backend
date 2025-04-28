// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nationalId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  simahScore: {
    type: Number,
    required: true,
  },
  activeLoans:{
    type: Number,
  },
  defaults:{
    type: Number,
  },
  avgBankBalance:{
    type: Number,
  },
  estimatedIncome:{
    type: Number,
  },
  spendingRatio:{
    type: Number, 
  },
  age: {
    type: Number,
    required: true,
  },
  dbrObligations: {
    type: Number,
  }
},{
  timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;