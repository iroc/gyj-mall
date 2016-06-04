'use strict'

const Cart = require('../models/cart')

exports.showCart = (req, res, next) => {
  res.render('cart', {
    user: req.session.user
  })
}

exports.getCartList = (req, res, next) => {
  let userId = req.session.user.id
  Cart.getByUserId(userId, (err, rows) => {
    if (err) {
      return next(err)
    }
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

  // 如果用户已登录，则是在线购物车
  if (req.session.user) {
    onlineCart(req,res)
  }else {
    res.redirect('/login')
  }
}

function onlineCart(req, res) {
  let user_id = req.session.user.id
  let product_id = req.query.pid
  let count = 1

  // 判断 count 是否大于0
  if (count <= 0) {
    return res.send('数量不能小于1')
  }

  // 判断当前购物车是否存在该商品
  Cart.getByUserIdAndProdId(user_id, product_id, (err, rows) => {
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
      let cart = new Cart(user_id, product_id, count)
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
