const express = require('express')
const route = require('./routes/global')
const cors = require('cors')
const config = require('../config');
const { check_login } = require('./middlewares/check_access');
let app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public'))
app.use(express.json())
app.use(cors());

route(app)
app.get('/',check_login, (req, res) => {
    res.json({ meta: { status: 200, messgae: 'okay' }, data: "Hello World" });
})

app.listen(config.basic.port);
