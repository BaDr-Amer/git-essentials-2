import mongoose from 'mongoose'

const seedSchema = new mongoose.Schema({
fileName : {type : 'string', required :true },
locked : false
})


export default mongoose.model('seedZ',seedSchema)
