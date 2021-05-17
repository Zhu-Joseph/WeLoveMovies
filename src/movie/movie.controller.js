const movieService = require("./movie.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await movieService.list()
    res.json({ data })
}

module.exports= {
    list,
}