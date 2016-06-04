'use strict'

const Product = require('../models/product')

exports.getByCategoryId = (req, res, next) => {
  let cid = req.params.cid
  Product.getByCategoryId(cid, (err, rows) => {
    if (err) {
      return next(err)
    }
    res.render('show', {
      products: rows,
      user: req.session.user
    })
  })
}

exports.getById = (req, res, next) => {
  let productId = req.params.pid
  Product.getById(productId, (err, rows) => {
    if (err) {
      return next(err)
    }
    res.render('product', {
      prod: rows[0],
      user: req.session.user
    })
  })
}
