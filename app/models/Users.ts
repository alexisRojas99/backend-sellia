/* eslint-disable func-names */
import { model, Schema } from 'mongoose';

const UsersSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_suspended: {
    type: Boolean,
    default: false,
  },
});

UsersSchema.methods.toJSON = function (): object {
  const { __v, password, ...data } = this.toObject();

  return data;
};

export default model('Users', UsersSchema);
