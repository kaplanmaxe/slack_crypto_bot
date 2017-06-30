import { MongoClient } from 'mongodb';
import { mongoDbUrl } from '../env';

export default class Database {
  /**
   * Connects to mongodb. Current pool size: 10
   */
  static connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(mongoDbUrl, {}, (err, dbInstance) => {
        err ? reject(err) : resolve(dbInstance);
      });
    });
  }
}
