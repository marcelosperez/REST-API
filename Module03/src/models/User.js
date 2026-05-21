import { Schema, model } from 'mongoose';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: emailRegex,
  },
});

export default model('User', UserSchema);
// A Model is a special constructor class 
// that has all the built-in database methods 
// like .create(), .find(), .updateOne(), etc.
