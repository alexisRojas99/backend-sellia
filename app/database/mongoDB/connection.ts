import mongoose, { ConnectOptions } from 'mongoose';

const host = process.env.MONGOOSE_HOST;
const port = process.env.MONGOOSE_PORT;
const database = process.env.MONGOSE_DATABASE;
const username = process.env.MONGOOSE_USERNAME;
const password = process.env.MONGOOSE_PASSWORD;

const URI_MONGO_DB = `mongodb+srv://${username}:${password}@${host}/${database}`;
console.log(URI_MONGO_DB);

export default class connectionMongoose {
  static async connection() {
    await mongoose.connect(
      URI_MONGO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
      (err) => {
        if (!err) {
          console.log('Connected to MongoDB');
        } else {
          console.log('Errorazo', err);
        }
      },
    );
  }
}
