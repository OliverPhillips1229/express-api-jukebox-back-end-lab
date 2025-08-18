import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true }
});

export default mongoose.model('Track', trackSchema);
