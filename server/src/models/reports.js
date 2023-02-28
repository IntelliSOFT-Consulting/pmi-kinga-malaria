import { model, Schema } from 'mongoose';

const ReportSchema = new Schema(
  {
    user: String,
    county: { type: Schema.Types.ObjectId, ref: 'County' },
    subCounty: { type: Schema.Types.ObjectId, ref: 'SubCounty' },
    ward: { type: Schema.Types.ObjectId, ref: 'Ward' },
    facility: { type: Schema.Types.ObjectId, ref: 'OrgUnit' },
    totalSop: Number,
    totalStructures: Number,
    sprayedStructures: Number,
    sachets: Number,
    test_yn: { type: String, default: 'no' },
    date: {
      type: Date,
      // default: new Date(),
    },
  },
  { timestamps: true }
);

export default model('Report', ReportSchema);
