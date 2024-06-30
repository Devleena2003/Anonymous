import mongoose, { Schema, Document } from 'mongoose'

//message schema

export interface Message extends Document{
    content: string,
    createdAt: Date
}

//declaring the custom interface to schema

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now
    }
})

//user schema

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptMessage: boolean,
    message: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique:true
    },

    email: {
        type: String,
        required:  [true, "Username is required"],
        unique: true,
        match: [ /.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required:  [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required:  [true, "Verify code is required"],
    },

    verifyCodeExpiry: {
        type: Date,
        required:  [true, "Verify code expiry is required"],
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptMessage: {
        type: Boolean,
        default: true  
    },

    message:[MessageSchema]

})

//This line defines the UserModel. It first checks if a model named User already exists in Mongoose models. If it does, it uses that model. If not, it creates a new model using the UserSchema.
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel