import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { collection: 'samplevideos' }
);

// Prevent model overwrite issue in dev
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
