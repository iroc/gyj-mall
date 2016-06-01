'use strict'

const qstring = require('querystring')

const User = require('../models/user')

exports.showRegister = (req,res) => {
  res.render('register')
}

exports.doRegister = (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;
  let verify_code = req.body.verify_code;

  // 1. 校验用户的输入

  // 2. 用户名是否被占用（查询数据库select）
  User.getByUsername(username,(err,user) => {
    if (err) {
      throw err
    }
    if (user) {
      // return res.send('用户名已存在')
      return res.json({
        code: '1001',
        message: 'username already exists'
      })
    }

    let u = new User(username,password,phone)

    u.save((err,uid) => {
      if (err) {
        throw err
      }

      // session中需要用户该用户的id
      u.id = uid

      // 注册成功，保存状态
      
      req.session.user = u

      res.json({
        code: '1000',
        message: 'ok'
      })
    });

  })
  // 2.1 如果被占用，告诉用户已经被占用了
  // 2.2 如果没有占用，就可以执行注册了（向数据库中插入数据insert）
  
}

exports.showLogin = (req,res) => {
  res.render('login')
}

exports.doLogin = (req,res) => {
  let username = req.body.username
  let password = req.body.password

  User.getByUsername(username,(err,user) => {
    if (err) {
      return next(err)
    }

    // 校验用户名是否存在
    if (!user) {
      return res.json({
        code: '2001',
        message: 'username not exists'
      })
    }

    // 校验密码是否正确
    if (password!==user.password) {
      return res.json({
        code: '2002',
        message: 'incorrect password'
      })
    }

    // 登陆成功，保存登陆状态
    req.session.user = user

    // 响应登陆成功消息
    res.json({
      code: '2000',
      message: 'success'
    })

  })
}

exports.doLogout = (req,res) => {
  req.session.user = null
  res.redirect('/login')
}
