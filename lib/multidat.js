const encoding = require('dat-encoding')

module.exports = Multidat

// manage a collection of dats
// (str, fn) -> null
function Multidat (db) {
  if (!(this instanceof Multidat)) return new Multidat(db)
  this.db = db
}

// (str, fn) -> null
Multidat.prototype.create = function (dat, cb) {
  this.db.put(['archive', dat.key], {
    path: dat.path,
    key: encoding.encode(dat.key),
    owner: dat.owner
  }, cb)
}

// (str, fn) -> null
Multidat.prototype.delete = function (key, cb) {
  this.db.del(['archive', key], err => {
    if (err) return cb(err)
    cb()
  })
}

// (fn) -> null
Multidat.prototype.list = function (cb) {
}
