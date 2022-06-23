const token_verify = require('../middlewares/token');

module.exports = function (app) {
    //middlewares
    app.use(token_verify);
    app.use('/user',require('./user'));
    app.use('/notes', require('./notes'))
}
