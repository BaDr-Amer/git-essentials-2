import mongoose from 'mongoose'
import User from './User'
import moment from 'moment';
import Twilio from 'twilio';

const ReminderSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  time: {type: Date},
  createdAt: {type: Date}
});



export default mongoose.model('reminder', ReminderSchema)