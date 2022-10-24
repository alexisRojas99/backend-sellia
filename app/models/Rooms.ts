/* eslint-disable func-names */
import { model, Schema, ToObjectOptions } from 'mongoose';

const RoomsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

RoomsSchema.methods.toJSON = function (): object {
  const { __v, status, ...data } = this.toObject();

  return data;
};

export default model('Rooms', RoomsSchema);
