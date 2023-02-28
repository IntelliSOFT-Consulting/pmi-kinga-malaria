import { Schema, model } from 'mongoose'

const WardSchema = new Schema(
    {
        country: { type: String, default: 'Kenya' },
        subCounty: {
            type: Schema.Types.ObjectId,
            ref: 'SubCounty',
            required: true,
        },
        name: { type: String, required: true },
        target: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
)

export default model('Ward', WardSchema)
