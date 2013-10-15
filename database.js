var mysql = require('mysql');
var fs    = require('fs');
var q     = require('q');

/* Set configuration mode to development or production.
   Read the configuration data from file and create a
   new mysql connection pool */
const mode = 'live';
var file   = JSON.parse(fs.readFileSync('dbconfig.json'));
var pool   = mysql.createPool(file[mode]);

module.exports = {

  /* Request a connection from the pool */
  getConnection: function() {
    var deferred = q.defer();
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      deferred.resolve(connection);
    });
    return deferred.promise;
  },
  /* Execute a query with the specified connection and query,
     returning a promise */
  execQuery: function(connection, query) {
    var deferred = q.defer();
    connection.query(query, function(err, results) {
      connection.release();
      if (err) throw err;
      deferred.resolve(results);
    });
    return deferred.promise;
  }
}