import mongoose from 'mongoose'

const options = {
    discriminatorKey: 'type',
    collection: 'LookupZ',
    timestamps: true
    
}

const schemaLookup = new mongoose.Schema({
    name: { type: String, required: true  }
}, options)
schemaLookup.
index({ type : 1,name :1 ,country_id :1}, {unique :1,partialFilterExpression :{ country_id : { $exists : true }}})

export default mongoose.model('LookupZ', schemaLookup)


