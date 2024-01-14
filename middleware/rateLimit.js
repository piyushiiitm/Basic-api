const { redisDb } = require('../resource/redis')

function getIpAddress(req) {
	if (req.connection.remoteAddress
		&& req.connection.remoteAddress !== '::1') {
		return req.connection.remoteAddress
	}
	if (req.headers['x-forwarded-for']) return req.headers['x-forwarded-for']
	return process.env.DEFAULT_IP || '92.0.2.146'
}

async function rateLimitter(req, res, next, params) {
	const { maxReq = 15, durationInSec = 15, type = 'g' } = params
	const key = `${type}-${getIpAddress(req)}`
	const result = await redisDb().get(key)
	if (!result) {
		await redisDb().set(key, 1, { EX: durationInSec, NX: true })
		return next()
	} else {
		if (result >= maxReq) return res.status(429).json({ statusCode: 429, message: 'To many requests' })
		await redisDb().incr(key, 1)
		return next()
	}
}

module.exports = {
	rateLimitter
}