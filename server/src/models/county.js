import { Schema, model } from 'mongoose'

const CountySchema = new Schema(
    {
        country: { type: String, default: 'Kenya' },
        name: { type: String, required: true },
        target: { type: Number, default: 0 },
    },
    { timestamps: true },
)

export default model('County', CountySchema)
