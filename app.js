const express = require('express')
const bodyParser = require('body-parser')
const postRouter = require('./router/post')
const errorHandler = require('./middleware/errorHandler')
const { rateLimitter } = require('./middleware/rateLimit')
const tryCatch = require('./utils/tryCatch')
const producer = require('./resource/producer')

const app = express()

app.use(bodyParser.json())

app.use(`${process.env.BASE_URI}`, postRouter)

app.use('/health', tryCatch(rateLimitter, { maxReq: 5, durationInSec: 5 }), async (req, res, next) => {
	res.status(200).json({ message: 'healthy' })
})

app.use('*', (req, res, next) => {
	res.status(404).json({
		statusCode: 404,
		message: 'Invalid Url'
	})
})

app.use(errorHandler);
app.listen(process.env.NODE_PORT, () => {
	console.log(`app is listening on port ${process.env.NODE_PORT}`)
})







