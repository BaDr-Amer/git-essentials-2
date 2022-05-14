import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose_delete from 'mongoose-delete'
import mongoose from 'mongoose'


const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
    book_cover_image: { type: String, required: true }
}, {
    timestamps: true
})

bookSchema.index({ bookName: "text" });
bookSchema.plugin(aggregatePaginate)
bookSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
bookSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model('Book', bookSchema)