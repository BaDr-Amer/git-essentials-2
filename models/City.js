import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const CitySchema = Lookup.discriminator('City', new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content'}
},{}))

export default CitySchema