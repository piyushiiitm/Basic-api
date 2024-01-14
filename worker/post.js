const { getConsumer } = require('../resource/kafka')
const postModel = require('../model/post')
const { redisDb } = require('../resource/redis')
const { POST_TOPIC } = require('../topicMapping')

function processPost(postText) {
	const wordCount = postText.split(/\s+/).length
	const wordAvg = (postText.length - wordCount + 1) / wordCount
	return { wordCount, wordAvg: parseFloat(wordAvg.toFixed(2)) }
}

async function postConsumer({ topic, partition, message }) {
	try {
		const parsedMessage = JSON.parse(message.value)
		const { postId, postText } = parsedMessage
		const { wordCount, wordAvg } = processPost(postText)
		const post = { postId, postText, wordAvg, wordCount }
		await postModel.update([wordCount, wordAvg, postId])
		await redisDb().set(postId, JSON.stringify(post))
	} catch (error) {
		console.log(`Error in post processing- ${postId}`, error)
	}
}

module.exports = async () => {
	const consumer = getConsumer()
	await consumer.subscribe({ topic: POST_TOPIC })
	await consumer.run({
		eachMessage: postConsumer,
	})
}

