import mongoose, { Schema } from 'mongoose';

export const postSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
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
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  }
});

postSchema.options = {
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
};

postSchema.methods = {
  upVote() {
    this.upVotes++;
  },
  downVote() {
    this.downVotes++;
  }
};

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
