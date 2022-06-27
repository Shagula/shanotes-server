const { my_link } = require('../models/notes');

module.exports = async function (req, res, next) {
    let path_id;
    if (req.method == 'GET')
        path_id = req.query.path_id;
    else
        path_id = req.body.path_id;
    let user_id = req.token.id;
    if (!await my_link(path_id, user_id))
        return res.json({ meta: { status: 400, message: '权限不够' } });
    return next();
}