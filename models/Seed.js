import mongoose from 'mongoose'

const seedSchema = new mongoose.Schema({
fileName : {type : 'string', required :true },

}).index({fileName :1 }, {unique :1 })


export default mongoose.model('seedZ',seedSchema)
