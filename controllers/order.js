'use strict'

const moment = require('moment')
const _ = require('underscore')
const db = require('../models/db')
const Cart = require('../models/cart')
const async = require('async')

exports.showIndex = (req, res, next) => {
  // 查询所有订单
  let sql = 'SELECT * FROM orders'

  db.query(sql, (err, rows) => {
    if (err) {
      return next(err)
    }
    async.each(rows, function(item, done) {
      let sql = `SELECT p.name as name FROM order_details as od INNER JOIN orders as o
      ON od.order_id=o.id
      INNER JOIN products as p
      ON od.product_id=p.id
      WHERE o.id=?`
      db.query(sql, [item.id], (err, details) => {
        if (err) {
          done(err)
        }
        let index = rows.findIndex(o => o.id == item.id)
        rows[index].prods = details
        done()
      })
    }, function(err) {
      if (err) {
        return next(err)
      }
      rows.forEach((order) => {
        order.order_date = moment(order.order_date).format('YYYY-MM-DD HH:mm:ss')
      })
      res.render('order', {
        orders: rows,
        user: req.session.user
      })
    })
  })
}

exports.add = function(req, res, next) {
  let user = req.session.user
  let user_id = user.id
  let order_date = moment().format('YYYY-MM-DD HH:mm:ss')
  let order_sn = moment().format('YYYYMMDDHHmmSS') + _.random(100, 999)
  let name = user.username
  let address = '北京市海淀区'
  let mobile = user.phone

  let sql = `
  INSERT INTO orders
  VALUES(NULL, ?, ?, ?, ?, ?, ?, NULL)
  `

  // 先创建订单
  db.query(sql, [
    user_id,
    order_sn,
    order_date,
    name,
    address,
    mobile
  ], (err, result) => {
    if (err) {
      return next(err)
    }
    if (result.insertId > 0) {
      // 从购物车中取出数据
      Cart.getByUserId(user_id, (err, rows) => {
        if (err) {
          return next(err)
        }

        let order_id = result.insertId
        let totalPrice = 0

        let index = 0
        let length = rows.length

        rows.forEach(function(item) {
          let product_id = item.id
          let count = item.count
          totalPrice += item.price * item.count

          let sql = `
            INSERT INTO order_details
            VALUES(NULL, ?, ?, ?)
          `

          db.query(sql, [order_id, product_id, count], (err, rows) => {
            if (err) {
              return res.send(err.message)
            }
            index++
            if (index === length) {
              db.query('UPDATE orders SET total_price=? WHERE id=?', [totalPrice, order_id], (err, rows) => {
                if (err) {
                  return next(err)
                }

                // 将当前用户购物车中数据全部删除
                db.query('DELETE FROM carts WHERE uid=?', [user_id], (err, rows) => {
                  if (err) {
                    return next(err)
                  }
                  res.redirect('/order')
                })
              })
            }
          })
        });

      })

    } else {
      res.json({
        code: '8001',
        msg: 'failed'
      })
    }
  })

}
