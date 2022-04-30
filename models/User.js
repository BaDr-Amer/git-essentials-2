import mongoose from 'mongoose'

const options = {
    discriminatorKey: 'type',
    collection: 'User',
    timestamps: true
}

const schemaUser = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String
}, options)






schemaUser.pre('save', function (next) {
    let fullName = [this.firstName, this.middleName, this.lastName]
        .filter(Boolean)
        .join(' ')
    this.fullName = fullName
    console.log("pre save has been called")


    if (this.isNew) {
        this.set({ createdAt: Date.now() })
        this.$locals.isNew = this.isNew
    } else {
        this.set({ updatedAt: Date.now() })
    }

    if (this.isModified('email')) {
        //
    }

    next()
})



export default mongoose.model('User', schemaUser)