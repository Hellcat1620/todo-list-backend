import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    isComplete: {
      type: Boolean,
      required: true
    },
    tag: {
      type: String,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Task', TaskSchema);