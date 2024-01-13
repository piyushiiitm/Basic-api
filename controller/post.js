const postModel = require('../model/post')
const producer = require('../resource/producer')
const response = require('../utils/response')
const validator = require('../utils/validator')

async function getPost(req, res, next) {
	const postId = req.params.postId;
	const result = await postModel.select([postId])
	return response.send(res, 200, 'Post Data', result)
}

async function createPost(req, res, next) {
	validator.inputError(req)
	const { postId, postText } = req.body
	await postModel.insert([postId, postText])
	await producer.send({
		topic: 'post',
		message: { postId, postText }
	})
	return response.send(res, 201, 'Post Created', [])
}

module.exports = {
	getPost, createPost
}