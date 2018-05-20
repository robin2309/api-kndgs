import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    required: true,
    unique: true
  },
  name: {
    type: String,
    trim: true,
    index: true,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    trim: true,
    required: true
  }
});

userSchema.pre('save', function(next) {
  const saltRounds = 10;
  bcrypt.hash(this.pwd, saltRounds, (err, hash) => {
    if (err) {
      global.__LOGGER__.error('Generate password error: ', err);
      return;
    }
    this.pwd = hash;
    next();
  });
});

userSchema.methods = {
  comparePasswords(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.pwd, (err, res) => {
        if (err) reject(err);
        if (res) resolve(this);
        else reject(new Error('Invalid login'));
      });
    });
  }
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
