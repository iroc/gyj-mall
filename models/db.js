'use strict'

const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'mall',
  user: 'root',
  password: 'root'
})

exports.query = function() {
  let args = arguments
  let sqlStr = args[0]
  let params = []
  let callback = function() {}

  if (args.length === 2 && typeof args[1] === 'function') {
    callback = args[1]
  } else if (args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function') {
    params = args[1]
    callback = args[2]
  } else {
    throw new Error('参数个数不匹配')
  }

  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err)
    }
    connection.query(sqlStr, params, function(err, rows) {
      if (err) {
        callback(err)
      }
      connection.release()
      callback.apply(null, arguments)
    })
  })
}
