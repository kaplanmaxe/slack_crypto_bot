'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {

  /**
   * constructor
   */
  function Base(db, collection) {
    _classCallCheck(this, Base);

    this.db = db.collection(collection);
  }

  /**
  * Finds records from a mongo collection
  *
  * @param data
  * @return Promise
  */


  _createClass(Base, [{
    key: 'find',
    value: function find(data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.db.find(data).toArray(function (err, docs) {
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

  }, {
    key: 'findOne',
    value: function findOne(data) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.findOne(data, function (err, docs) {
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

  }, {
    key: 'findAndModify',
    value: function findAndModify(find, replace) {
      var _this3 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      return new Promise(function (resolve, reject) {
        _this3.db.findAndModify(find, sort, replace, options, function (err, result) {
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

  }, {
    key: 'insert',
    value: function insert(data) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.insert(data, function (error, result) {
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

  }, {
    key: 'remove',
    value: function remove(data) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.remove(data, function (err, result) {
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

  }, {
    key: 'count',
    value: function count() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.count(function (error, result) {
          if (!result || error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }]);

  return Base;
}();

exports.default = Base;