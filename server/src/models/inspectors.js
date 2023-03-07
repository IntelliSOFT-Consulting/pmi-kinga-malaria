import { Schema, model } from 'mongoose';

const inspectorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export default model('Inspector', inspectorSchema);
