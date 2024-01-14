
const express = require('express')
const { body } = require('express-validator')

const tryCatch = require('../utils/tryCatch')
const postController = require('../controller/post')
const { rateLimitter } = require('../middleware/rateLimit')

const router = express()

router.get(
	'/posts/:postId/analysis',
	tryCatch(rateLimitter, { maxReq: 60, durationInSec: 60, type: 'gp' }),
	postController.getPost
)
router.post('/posts',
	[
		body('postText').trim().isLength({ min: 5 }),
		body('postId').trim().isLength({ min: 2 })
	],
	tryCatch(rateLimitter, { maxReq: 10, durationInSec: 60, type: 'cp' }),
	tryCatch(postController.createPost)
)



module.exports = router