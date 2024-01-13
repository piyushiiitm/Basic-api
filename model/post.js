
const { mysqlQuery } = require('../resource/mysql')
const validator = require('../utils/validator')

async function insert(params) {
	try {
		const result = await mysqlQuery({
			query: "INSERT INTO posts (postId, postText) VALUES (?,?) ",
			params
		})
		return !!result
	} catch (err) {
		validator.dbError(err)
	}
}

async function select(params) {
	try {
		const query = 'SELECT * FROM posts WHERE postId = ?'
		const result = await mysqlQuery({ query, params })
		return result.length ? result[0] : {}
	} catch (error) {
		validator.dbError(err)
	}
}

async function update(params) {
	try {
		const query = "UPDATE posts SET wordCount = ?, wordAvg = ? WHERE postId = ? "
		const result = await mysqlQuery({ query, params })
		return result.length ? result[0] : {}
	} catch (error) {
		console.log(error)
	}
}

module.exports = { insert, select, update }