'use strict'

const db = require('./db')

function User(username, password, phone) {
  this.username = username
  this.password = password
  this.phone = phone
}

User.prototype.save = function(callback) {
  let insertSql = 'INSERT INTO `users`(`username`,`password`,`phone`) VALUES(?,?,?)'
  db.query(insertSql, [this.username, this.password, this.phone], function(err, rows) {
    if (err) {
      return callback(err)
    }
    callback(null, rows.insertId)
  })
}

User.getByUsername = function(username, callback) {
  let querySql = 'SELECT * FROM `users` WHERE `username`=?'
  db.query(querySql, [username], function(err, rows) {
    if (err) {
      return callback(err, null)
    }
    callback(null, rows[0])
  })
}

module.exports = User
