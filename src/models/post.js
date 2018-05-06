import mongoose, { Schema } from 'mongoose';

export const postSchema = new Schema({
  link: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  desc: {
    type: String,
    trim: true
  }
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
