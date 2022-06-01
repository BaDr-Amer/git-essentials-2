import mongoose from 'mongoose'
import reminder from './reminder'


const beforeReminderSchema = reminder.discriminator('before', new mongoose.Schema({
scheduleIn : String
},{}))
