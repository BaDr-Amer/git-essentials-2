import mongoose from "mongoose";
export interface AuditLog {
    UserId: mongoose.Schema.Types.ObjectId,
    OriginalUrl: String,
    Method: String,
    Status: Number,
    Date: Date,
    ResponseTime: Number
}

export interface IAuditLog extends AuditLog, Document {

}

const user = new mongoose.Schema<IAuditLog>({

    UserId: mongoose.Schema.Types.ObjectId,
    OriginalUrl: String,
    Method: { type: String, enum: ['GET', 'POST', 'UPDATE', 'DELETE'] },
    Status: Number,
    Date: Date,
    ResponseTime: Number
})

export default mongoose.model<IAuditLog>('AuditLog', user)