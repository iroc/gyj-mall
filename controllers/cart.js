'use strict'

const Cart = require('../models/cart')

exports.showCart = (req, res, next) => {
  res.render('shopcart')
}

exports.getCartList = (req, res, next) => {
  let userId = 1
  Cart.getByUserId(userId, (err, rows) => {
    res.send(rows)
  })
}

exports.remove = (req, res, next) => {
  let cid = req.query.cid
  Cart.removeByCartId(cid, (err, rows) => {
    if (err) {
      return next(err)
    }
    res.json({
      code: '3000',
      msg: 'ok'
    })
  })
}

exports.add = (req, res, next) => {
  let uid = 1
  let pid = req.query.pid
  let count = 1

  // 判断 count 是否大于0
  if (count <= 0) {
    return res.send('数量不能小于1')
  }

  // 判断当前购物车是否存在该商品
  Cart.getByUserIdAndProdId(uid, pid, (err, rows) => {
    if (err) {
      return next(err)
    }

    let cartProd = rows[0]
    // 如果已存在则让该商品数量+1（修改）
    // 如果不存在，则添加一条记录（增加）
    if (cartProd) {
      let count = cartProd.count + 1
      Cart.updateCount(count, cartProd.id, (err, result) => {
        if (err) {
          return next(err)
        }
        if (result.affectedRows === 1) {
          res.redirect('/cart')
        } else {
          res.send('添加购物车失败')
        }
      })
    } else {
      let cart = new Cart(uid, pid, count)
      cart.save((err, result) => {
        if (err) {
          return next(err)
        }
        if (result.affectedRows === 1) {
          res.redirect('/cart')
        } else {
          res.send('添加购物车失败')
        }
      })
    }
  })
}
