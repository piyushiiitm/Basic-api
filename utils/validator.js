const { validationResult } = require('express-validator')

function inputError(req, res, next) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new Error('Invalid input')
		error.statusCode = 422
		error.data = errors.array()
		throw error
	}
}

function dbError(err) {
	if (err.code === 'ER_DUP_ENTRY') {
		const error = new Error('Duplicate Entry')
		error.statusCode = 409
		error.data = []
		throw error
	}
	throw new Error()
}

module.exports = {
	inputError, dbError
}