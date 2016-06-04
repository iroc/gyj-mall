'use strict'

const async = require('async')

const db = require('./models/db')


db.query(`SELECT * FROM users
    `, function(err, rows) {
  if (err) {
    done(err)
  }
  console.log(rows.length);
})
