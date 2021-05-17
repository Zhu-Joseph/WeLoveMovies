const router = require("express").Router()
const controller = require("./review.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")
const corsGet = cors({methods: "GET"})

router.route("/reviews").get(controller.list).all(methodNotAllowed)

module.exports = router