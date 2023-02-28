import { Schema, model } from 'mongoose'

const ScheduleSchema = new Schema(
  {
    report: { type: String, required: true },
    frequency: { type: String, required: true },
    day: { type: String },
    recurring: { type: Boolean, default: true },
    time: { type: String, required: true },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'MailList' }],
  },
  {
    timestamps: true,
  }
);

export default model('Schedule', ScheduleSchema)
