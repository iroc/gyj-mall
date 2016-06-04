'use strict'

const Cart = require('../models/cart')
const Product = require('../models/product')

exports.showCart = (req, res, next) => {
  res.render('cart', {
    user: req.session.user
  })
}

exports.getCartList = (req, res, next) => {
  // 在线购物车数据
  if (req.session.user) {
    let userId = req.session.user.id
    Cart.getByUserId(userId, (err, rows) => {
      if (err) {
        return next(err)
      }
      res.send(rows)
    })
  } else {
    // 离线购物车数据
    // 获取离线购物车 cookie 信息
    let cookieInfo = req.cookies['cart_info']

    try {
      if (!cookieInfo) {
        cookieInfo = {}
      }else {
        cookieInfo = JSON.parse(cookieInfo)
      }

      let product_ids = Object.keys(cookieInfo).join(',')

      Product.getByIds(product_ids, (err, rows) => {
        if (err) {
          return next(err)
        }
        rows.forEach((item) => {
          item.count = cookieInfo[item.id]
        })
        console.log(cookieInfo)
        console.log(rows)
        res.send(rows)
      })

    } catch (e) {
      return next(err)
    }
  }
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
    onlineCart(req, res)
  } else {
    // 离线购物车
    offlineCart(req, res)
  }
}

function offlineCart(req, res) {
  // 从 cookie 中获取购物车信息
  let cartInfo = req.cookies['cart_info']
  let product_id = req.query.pid
  let count = 1

  try {
    cartInfo = cartInfo ? JSON.parse(cartInfo) : {}

    // 如果购物车中没有该商品，则添加该商品到购物车
    if (!cartInfo[product_id]) {
      cartInfo[product_id] = count
    } else {
      // 如果购物车中已存在该商品，则让该商品数量加1
      cartInfo[product_id] += 1
    }

    // 重新写入离线购物车cookie，这里设置过期时间为 30 天
    res.cookie('cart_info', JSON.stringify(cartInfo), {
      maxAge: 1000 * 60 * 60 * 24 * 30
    })

    res.redirect('/cart')
  } catch (e) {
    res.send('购物车数据错误')
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
