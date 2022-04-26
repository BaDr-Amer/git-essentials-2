import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const schema = new mongoose.Schema()
schema.index({ type: 1, name: 1 }, { unique: true })

const countrySchema = Lookup.discriminator('Country', schema)

export default countrySchema