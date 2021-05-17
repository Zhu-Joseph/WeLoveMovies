const theaterService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await theaterService.list()
    res.json({ data })
}

module.exports= {
    list,
}