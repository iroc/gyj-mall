'use strict'

const express = require('express')
const router = express.Router()

const indexController = require('./controllers/index')
const userController = require('./controllers/user')
const productController = require('./controllers/product')
const cartController = require('./controllers/cart')

// 展示首页
router.get('/', indexController.showIndex)
router.get('/index.html', indexController.showIndex)

// 展示注册页面
router.get('/register', userController.showRegister)

// 处理注册请求
router.post('/register', userController.doRegister)

// 展示登陆页面
router.get('/login', userController.showLogin)

// 处理登陆请求
router.post('/login', userController.doLogin)

// 处理用户退出请求
router.get('/logout', userController.doLogout)

// 产品列表展示
router.get('/list/cat/:cid', productController.getByCategoryId)

// 产品展示
router.get('/product/:pid', productController.getById)

// 展示购物车
router.get('/cart', cartController.showCart)

// 获取购物车数据
router.get('/cart/list', cartController.getCartList)

// 从购物车中删除商品
router.get('/cart/remove', cartController.remove)

// 添加购物车
router.get('/cart/add', cartController.add)

// 未登录跳转到登陆页面
function checkLogin(req, res, next) {
  let user = req.session.user
  if (!user) {
    return res.redirect('/login')
  }
  next()
}

module.exports = router
