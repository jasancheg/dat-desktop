const mount = require('choo/mount')
const log = require('choo-log')
const choo = require('choo')

const mainView = require('./pages/main')

const app = choo()
app.use(log())

// import & init models
app.model(require('./models/app')())

// start
app.router(['/', mainView])
mount('body', app.start())
