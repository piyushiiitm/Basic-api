const producer = require('../resource/kafka').getProducer()

function isValid({ topic, message }) {
	return topic && message
}

async function send({ topic, message }) {
	if (!isValid({ topic, message })) return
	await producer.send({
		topic,
		messages: [
			{ value: JSON.stringify(message) },
		],
	})
}

module.exports = {
	send
}