import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'

const stageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    order: { type: Number, required:true },
    ticket_count: {type: Number}
}, {
    timestamps: true
})

stageSchema.plugin(paginate)
stageSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
stageSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model('Stage', stageSchema)