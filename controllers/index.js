'use strict'

const Category = require('../models/category')

exports.showIndex = (req, res, next) => {
  Category.getAll((err, rows) => {
    if (err) {
      return next(err)
    }
    res.render('index', {
      user: req.session.user,
      categories: rows
    })
  })
}
