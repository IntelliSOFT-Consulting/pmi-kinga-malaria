import { model, Schema } from 'mongoose';

const submissionSchema = new Schema(
  {
    formName: String,
    formId: String,
    submission: Object,
  },
  {
    timestamps: true,
  }
);

export default model('Submission', submissionSchema);
