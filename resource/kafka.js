const { Kafka, Partitioners } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'assignment',
	brokers: process.env.KAFKA_URL.split(','),
	logLevel: 0
})

const producerConn = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
const consumerConn = kafka.consumer({ groupId: 'post-group' })

module.exports = {
	kafkaConnect: async () => {
		try {
			await producerConn.connect()
			await consumerConn.connect()
		} catch (error) {
			throw Error('Error in producer/consumer connection')
		}
	},
	getProducer: () => producerConn,
	getConsumer: () => consumerConn
}