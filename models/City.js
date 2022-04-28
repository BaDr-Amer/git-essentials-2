import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const citySchema = Lookup.discriminator('City', new mongoose.Schema({
    countryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Country' },
    name: { type: String, required: true }
}))

export default citySchema