import mongoose from "mongoose";
export interface ReqUser {
    email: string,
    password: string,
    firstName: string,
    middleName: string,
    lastName: string,
    isInfected: boolean,
    createdAt : Date,
    updatedAt : Date

}

export interface IUser extends  ReqUser  ,Document{

}

const user  =  new  mongoose.Schema<IUser>({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    isInfected: Boolean,
    createdAt : Date,
    updatedAt : Date
    
})
user.pre('save', function (next) {
    


    if (this.isNew) {
        this.set({ createdAt: Date.now() })
        this.set({ updatedAt: Date.now() })
        this.$locals.wasNew = this.isNew
        
    } else {
        this.set({ updatedAt: Date.now() })
    }

   

    next()
})

export default mongoose.model<IUser>('User', user)