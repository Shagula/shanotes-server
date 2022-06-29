const express = require('express')
const { check_login } = require('../middlewares/check_access')
const user = require('../models/user')
const statcode = require('../../config').statcode
let route = express.Router()

route.post('/signup', async (req, res) => {
    let body = req.body
    let ret = await user.add_user(body.username, body.password)
    if (ret.stat == statcode.ok) {
        res.json({
            meta: {
                status: ret.stat
            }
        })
    }
    else {
        res.json({
            meta: {
                status: ret.stat,
                message: ret.err
            }
        })
    }
})

route.post('/signin', async (req, res) => {
    let body = req.body
    let ret = await user.login(body.username, body.password)
    if (ret.stat == statcode.ok) {
        res.json({
            token: ret.jwt,
            username: ret.name,
            id: ret.id,
            access: ret.access,
            meta: {
                status: ret.stat
            }
        })
    }
    else {
        res.json({
            meta: {
                status: ret.stat,
                message: ret.err
            }
        })
    }
})
route.post('/update_password', check_login, async (req, res) => {
    let user_id = req.token.id;
    let info = req.body;
    if (!info || !info.password || info.password.length < 6)
        return res.json({ meta: { status: 400, message: '非法密码，密码至少六位' } });
    let stat = await user.change_password(user_id, info.password);
    return res.json({ meta: { status: stat.stat, message: stat.msg } });
})
route.get('/', async (req, res) => {
    let ip = (req.ip.split(':'))[3]
    res.send(`Hello my friend from ${ip}`)
})

module.exports = route