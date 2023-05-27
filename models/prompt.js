import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const promptModelExists = mongoose.modelNames().includes('Prompt');

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required']
  }
});
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
