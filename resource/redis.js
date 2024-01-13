const redis = require('redis')

let redisClient

async function redisConnect() {
	const client = redis.createClient({ url: process.env.REDIS_URL })
	redisClient = await client.connect()
}
const redisDb = () => redisClient

module.exports = {
	redisConnect,
	redisDb
}