'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

var _env = require('../env');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, null, [{
    key: 'connect',

    /**
     * Connects to mongodb. Current pool size: 10
     */
    value: function connect() {
      return new Promise(function (resolve, reject) {
        _mongodb.MongoClient.connect(_env.mongoDbUrl, {}, function (err, dbInstance) {
          err ? reject(err) : resolve(dbInstance);
        });
      });
    }
  }]);

  return Database;
}();

exports.default = Database;