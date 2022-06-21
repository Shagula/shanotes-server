const token_verify = require('../middlewares/token');

module.exports = function (app) {
    //middlewares
    //routes
    app.use('/user', require('./user'))
    app.use('/notes', require('./notes'))
}
