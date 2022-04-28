import mongoose from 'mongoose'
import Story from './Story.js'

const imageSchema  = new mongoose.Schema({
text : { type: String ,required :true }
})

export default Story.discriminator('text', imageSchema)