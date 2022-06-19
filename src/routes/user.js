const express = require('express')
const user = require('../modules/user')
const statcode = require('../../config').statcode
let route = express.Router()

route.post('/signup', async (req, res) => {
    let body = req.body
    let ret = await user.add_user(body.username, body.password) 
    if (ret.stat == statcode.ok){
        res.json({
            meta:{
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
    if (ret.stat == statcode.ok){
        res.json({
            token: ret.jwt,
            username: ret.name,
            id: ret.id,
            access: ret.access,
            meta:{
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

route.get('/', async (req, res)=>{
    let ip = (req.ip.split(':'))[3]
    res.send(`Hello my friend from ${ip}`)
})

module.exports = route