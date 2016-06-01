'use strict'

module.exports = Category

const db = require('./db')

function Category (name) {
  this.name = name
}

Category.getAll = function (callback) {
  let sql = 'SELECT * FROM categories'
  db.query(sql, callback)
}

Category.prototype.save = function (callback) {
  let sql = 'INSERT INTO categories(`name`) VALUES(?)'
  db.query(sql, callback)
}
