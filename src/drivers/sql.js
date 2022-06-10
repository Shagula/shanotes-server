const mysql = require("mysql")
const sql_conf = require('../../config').sql
let sql_connection;
let ping_itv;
function create_connection() {
	let json_data = sql_conf;
	if (sql_connection) {
		sql_connection.destroy();
		sql_connection = null;
	}
	try {
		let ret = mysql.createConnection(
			{
				host: json_data.host,
				port: json_data.port,
				user: json_data.user,
				password: json_data.password,
				database: json_data.database,
				dateStrings: true,
				charset: 'UTF8MB4_GENERAL_CI'
			}
		)
		clearInterval(ping_itv);
		ping_itv = setInterval(() => {
			ret.ping((err) => {
				if (err) {
					console.log(err);
				}
			});
		})
		ret.on("error", () => {
			setInterval(() => sql_connection = create_connection()
				, 2000);

		})
		return ret;
	}
	catch (err) {
		console.log(err);
		console.log("connnected to sql failed!");
		process.exit();
	}
}
sql_connection = create_connection()
sql_connection.qry = async function (ins, arr) {
	return new Promise(function (resolve, reject) {
		sql_connection.query(ins, arr, (err, res) => {
			if (err) {
				// console.log(err)
				resolve({ verdict: false, err: err })
			}
			else {
				resolve({ verdict: true, data: res })
			}
		})
	})
}

sql_connection.check = async function (tab, field, value) {
	return new Promise(function (resolve, reject) {
		sql_connection.query(`select 1 from ${tab} where ${field} = ?`, [value], (err, res) => {
			if (err) {
				resolve({ verdict: false, err: err })
			}
			else {
				if (res.length != 0){
					resolve({ verdict: true})
				}
				else {
					resolve({verdict: false})
				}
			}
		})
	})
}

module.exports = {
	sql_connection
}