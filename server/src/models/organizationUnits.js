import { Schema, model } from 'mongoose'

const OrganizationUnitSchema = new Schema(
    {
        country: { type: String, default: 'Kenya' },
        county: { type: Schema.Types.ObjectId, ref: 'County', required: true },
        subCounty: {
            type: Schema.Types.ObjectId,
            ref: 'SubCounty',
            required: true,
        },
        ward: { type: Schema.Types.ObjectId, ref: 'Ward', required: true },
        name: { type: String, required: true },
        target: { type: Number, default: 0 },
        pmtDataCollector: { type: Schema.Types.ObjectId, ref: 'User' },
        supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    },
)

export default model('OrgUnit', OrganizationUnitSchema)
