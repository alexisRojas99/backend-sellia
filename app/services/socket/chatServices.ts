/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
class Messages {
  id: string;
  name: string;
  message: string;

  constructor(id: string, name: string, message: string) {
    this.id = id;
    this.name = name;
    this.message = message;
  }
}

export default class ChatServices {
  users: any;
  message: any;

  constructor() {
    this.message = [];
    this.users = {};
  }

  get recentMessages() {
    this.message = this.message.splice(0, 10);
    return this.message;
  }

  get onlineUsersArr() {
    return Object.values(this.users);
  }

  onlineUsers(data: any) {
    this.users[data?.user?.id] = data;
  }

  sendMessage(data: any) {
    this.message.unshift(new Messages(data.id, data.name, data.message));
  }

  disconnectUsers(id: string) {
    delete this.users[id];
  }
}
