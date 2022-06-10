const sql = require("mysql")
const sql_conf = require('../../config').sql
let connection = sql.createConnection({
  host: sql_conf.host,
  user: sql_conf.user,
  password: sql_conf.password,
  database: sql_conf.database
})
console.log
function init() {

}

function query() {

}