const { getConsumer } = require('../resource/kafka')
const postModel = require('../model/post')

const TOPIC = 'post'
function processPost(postText) {
	const wordCount = postText.split(/\s+/).length
	const wordAvg = (postText.length - wordCount + 1) / wordCount
	return {
		wordCount,
		wordAvg: parseFloat(wordAvg.toFixed(2)),
	}
}

async function postConsumer({ topic, partition, message }) {
	const parsedMessage = JSON.parse(message.value)
	const { postId, postText } = parsedMessage
	const { wordCount, wordAvg } = processPost(postText)
	await postModel.update([wordCount, wordAvg, postId])
}

module.exports = async () => {
	const consumer = getConsumer()
	await consumer.subscribe({ topic: TOPIC })
	await consumer.run({
		eachMessage: postConsumer,
	})
}

