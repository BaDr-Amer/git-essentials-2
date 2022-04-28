import mongoose from 'mongoose'
import Story from './Story.js'

const imageSchema  = new mongoose.Schema({
Image : { type: String, required:true },
text : { type: String }
})

export default Story.discriminator('image', imageSchema)