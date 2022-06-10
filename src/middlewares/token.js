const express = require('express')
const statcode = require('../../config').statcode 
const cryption = require('../utils/cryption')
function token_verify(req, res, next){
    let token;
    if (res.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '')
    }
    else if (req.cookies.token){
        token = req.cookies.token
    }
    else {
        res.json({
            status: statcode.invalidated_token,
            meta: {
                message: 'invalidated token'
            }
        })
        return 
    }
    let user = cryption.jwt_verify(token)
    req.token = {name: user.name, id: user.id, access: user.access}
    next()
}
