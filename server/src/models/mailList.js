import { model, Schema } from 'mongoose';

const mailListSchema = new Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('MailList', mailListSchema);
