const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Prompt title is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Prompt content is required']
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    favorite: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

promptSchema.index({ title: 'text', content: 'text', category: 'text', tags: 'text' });

module.exports = mongoose.model('Prompt', promptSchema);
