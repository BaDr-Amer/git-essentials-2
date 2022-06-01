import mongoose from 'mongoose'
import reminder from './reminder'


const afterReminderSchema = reminder.discriminator('after', new mongoose.Schema({
scheduleAfter : String
},{}))
