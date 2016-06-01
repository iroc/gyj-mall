'use strict'

const db = require('./db')

function Product () {
}

Product.getByCategoryId = function (cid, callback) {
  let sql = 'SELECT * FROM `products` WHERE `cid`=?'
  db.query(sql, [cid], callback)
}

Product.getById = function (id, callback) {
  let sql = 'SELECT * FROM `products` WHERE `id`=?'
  db.query(sql, [id], callback)
}

module.exports = Product
