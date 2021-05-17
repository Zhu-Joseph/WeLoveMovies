const reviewService = require("./review.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await reviewService.list()
    res.json({ data })
}

module.exports= {
    list,
}