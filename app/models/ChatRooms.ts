/* eslint-disable func-names */
import { model, Schema } from 'mongoose';

const ChatRoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  id_room: {
    type: Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  view_counter: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

ChatRoomSchema.methods.toJSON = function (): object {
  const { __v, ...data } = this.toObject();

  return data;
};

export default model('ChatRooms', ChatRoomSchema);
