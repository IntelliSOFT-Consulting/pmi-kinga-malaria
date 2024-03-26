import { Schema, model } from 'mongoose';

const supervisorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: { type: String },
  county: {
    type: String,
    required: true,
  },
  subCounty: { type: String },
  site: { type: String },
});

export default model('Supervisor', supervisorSchema);
