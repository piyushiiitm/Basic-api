module.exports = (error, req, res, next) => {
	const statusCode = error.statusCode || 500
	const message = error.message || 'Server Error'
	const data = error.data || []
	return res.status(statusCode).json({ statusCode, message, data })
}