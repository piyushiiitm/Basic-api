function send(res, statusCode, message, data) {
	return res.status(statusCode).json({ statusCode: statusCode, message, data })
}

module.exports = { send }