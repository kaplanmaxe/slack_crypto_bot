export default class Base {

  /**
   * constructor
   */
  constructor(db, collection) {
    this.db = db.collection(collection);
  }

  /**
  * Finds records from a mongo collection
  *
  * @param data
  * @return Promise
  */
  find(data) {
    return new Promise((resolve, reject) => {
      this.db.find(data).toArray((err, docs) => {
        if (!docs || err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  /**
   * Finds one record from mongodb
   */
  findOne(data) {
    return new Promise((resolve, reject) => {
      this.db.findOne(data, (err, docs) => {
        if (!docs || err) {
          reject('No records found.');
        } else {
          resolve(docs);
        }
      });
    });
  }

  /**
   * Find and modify method for mongo
   *
   * @param find
   * @param replace
   * @param options
   * @param sort
   */
  findAndModify(find, replace, options = {}, sort = []) {
    return new Promise((resolve, reject) => {
      this.db.findAndModify(find, sort, replace, options, (err, result) => {
        if (!result || err || result.value === null) {
          reject(err || new Error('No record found.'));
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Inserts records into db
   *
   * @param data
   * @return Promise
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      this.db.insert(data, (error, result) => {
        if (!result || error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Removes a record from a collection
   *
   * @param data object
   */
  remove(data) {
    return new Promise((resolve, reject) => {
      this.db.remove(data, (err, result) => {
        if (!result || err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Counts how many records in collection
   */
  count() {
    return new Promise((resolve, reject) => {
      this.db.count((error, result) => {
        if (!result || error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
