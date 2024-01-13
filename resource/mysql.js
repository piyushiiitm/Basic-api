const mysql = require('mysql2/promise')
let db

async function mySqlConnnect() {
	db = await mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE_NAME,
	})
}

async function mysqlQuery({ query, params, option }) {
	const [results, fields] = await db.execute(query, params)
	return results
}

const mysqlDb = () => db;

module.exports = {
	mySqlConnnect,
	mysqlDb,
	mysqlQuery
}