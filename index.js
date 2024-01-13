require('dotenv').config()
const { mySqlConnnect } = require('./resource/mysql')
const { redisConnect } = require('./resource/redis')
const { kafkaConnect } = require('./resource/kafka')
const startConsumer = require('./worker')
Promise.all([
	mySqlConnnect(),
	redisConnect(),
	kafkaConnect(),
])
	.then(() => {
		require('./app')
		startConsumer()
	})
	.catch((e) => {
		console.log(e);
		process.exit(1);
	});