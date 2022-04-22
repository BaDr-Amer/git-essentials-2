import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const UniversitySchema = Lookup.discriminator('University', new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content'  }
}))

export default UniversitySchema