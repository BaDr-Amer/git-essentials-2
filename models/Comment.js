import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ticket_id :  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Ticket' }
}, {
    timestamps: true
})

commentSchema.plugin(paginate)
commentSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
commentSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model('Comments', commentSchema)