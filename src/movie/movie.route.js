const router = require("express").Router()
const controller = require("./movie.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")
const corsGet = cors({methods: "GET"})

router.route("/movies").get(controller.list).all(methodNotAllowed)

module.exports = router