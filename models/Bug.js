import mongoose from 'mongoose'
import Ticket from './Ticket.js'

const subTicketSchema = Ticket.discriminator('Bug', new mongoose.Schema({
    Severity: {type: String}
}, { timestamps: true }))

export default subTicketSchema