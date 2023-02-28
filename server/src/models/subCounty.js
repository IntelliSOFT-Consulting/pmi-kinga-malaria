import { Schema, model } from 'mongoose'

const SubCountySchema = new Schema(
    {
        country: { type: String, default: 'Kenya' },
        county: { type: Schema.Types.ObjectId, ref: 'County', required: true },
        name: { type: String, required: true },
        target: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
)

export default model('SubCounty', SubCountySchema)
