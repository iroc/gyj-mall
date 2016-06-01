'use strict'

const db = require('./db')

function Cart (uid, pid, count) {
  this.uid = uid
  this.pid = pid
  this.count = count
}

Cart.prototype.save = function (callback) {
  let sql = 'INSERT INTO `carts`(`id`,`uid`,`pid`,`count`) VALUES(NULL,?,?,?)'
  db.query(sql, [ this.uid, this.pid, this.count ], callback)
}

Cart.getByUserId = function (uid, callback) {
  let sql = 'SELECT p.id as id, p.name as name, p.price as price, c.id as cart_id, c.count as count FROM `carts` as c INNER JOIN `products` as p ON c.pid=p.id WHERE `uid`=? '
  db.query(sql, [ uid ], callback)
}

Cart.getByUserIdAndProdId = function (uid, pid, callback) {
  let sql = 'SELECT * FROM `carts` WHERE `uid`=? and `pid`=?'
  db.query(sql, [ uid, pid ], callback)
}

Cart.removeByCartId = function (cid, callback) {
  let sql = 'DELETE FROM `carts` WHERE `id`=?'
  db.query(sql, [ cid ], callback)
}

Cart.updateCount = function (count, id, callback) {
  let sql = 'UPDATE `carts` SET `count`=? WHERE `id`=?'
  db.query(sql, [ count, id ], callback)
}

module.exports = Cart
