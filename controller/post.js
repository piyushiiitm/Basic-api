const postModel = require('../model/post')
const producer = require('../resource/producer')
const response = require('../utils/response')
const validator = require('../utils/validator')
const { redisDb } = require('../resource/redis')
const { POST_TOPIC } = require('../topicMapping')

async function getPost(req, res, next) {
	const postId = req.params.postId;
	const redisResult = await redisDb().get(postId)
	const result = redisResult ? JSON.parse(redisResult) : await postModel.select([postId])
	return response.send(res, 200, 'Post Data', result)
}

async function createPost(req, res, next) {
	validator.inputError(req)
	const { postId, postText } = req.body
	await postModel.insert([postId, postText])
	await producer.send({
		topic: POST_TOPIC,
		message: { postId, postText }
	})
	return response.send(res, 201, 'Post Created', [])
}

module.exports = {
	getPost, createPost
}