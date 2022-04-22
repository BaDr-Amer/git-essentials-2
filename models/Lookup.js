import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const options = {
    discriminatorKey: 'type',
    collection: 'LookupZ',
    timestamps: true
    
}

const schemaLookup = new mongoose.Schema({
    name: { type: String, required: true  }
}, options).index({ name :1,country_id :1}, {unique :1},)

export default mongoose.model('LookupZ', schemaLookup)


