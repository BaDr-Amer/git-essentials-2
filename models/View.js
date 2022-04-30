import mongoose from 'mongoose'

const viewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    story_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }
}, { timestamps: true })

export default mongoose.model('View', viewSchema)