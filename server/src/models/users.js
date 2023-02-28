import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: String,
        email: String,
        role: String,
    },
    { timestamps: true },
)

export default model('User', UserSchema)
