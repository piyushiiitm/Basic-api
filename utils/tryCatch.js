module.exports = (controller, params) => async (req, res, next) => {
	try {
		await controller(req, res, next, params)
	} catch (error) {
		next(error)
	}
}