import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'
import { index } from "../utils/elastic.js";
import Ticket from './Ticket.js'

const options = {
    discriminatorKey: 'type',
    collection: 'Ticket',
    timestamps: true
}


const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workFlow: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stage' }],
    current_stage: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stage' },
    description: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Ticket' },
    comments : [{
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comments' },
        comment : { type: String, required: true }
    }],
    project_id:  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' }
}, options)

ticketSchema.plugin(paginate)
ticketSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
ticketSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })


ticketSchema.post("save", async function (doc, next) {
    // send doc to elasticsearch
    console.log("post save has been called");
    const copy = await Ticket.findOne({_id:doc._id }).populate(['Project','Stage','Comments'])
    delete copy._id;
    delete copy.__v;
    await index(doc._id, "ticket", copy);
    next();
  });


export default mongoose.model('Ticket', ticketSchema)