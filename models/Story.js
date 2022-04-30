import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'


const storySchema = new mongoose.Schema({
    ImageURL: { type: String, required: true },
    storyCreator: { user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, userName: { type: String, required: true } },
    content: { type: String },
    expireDate: { type: Date, required: true },
    viewersCount: { type: Number, default: 0 }
}, {
    timestamps: true
})

storySchema.index({ "expireDate": 1 }, { expireAfterSeconds: 0 });
storySchema.index({ "storyCreator.userName": "text", content: "text" });
storySchema.plugin(mongoosePaginate)
storySchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
storySchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })

export default mongoose.model('Story', storySchema)