if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const movieRouter = require("./movie/movie.route")
const reviewRouter = require("./review/review.route")
const theatersRouter = require("./theaters/theaters.route")

app.use(express.json())

app.use("/movies", movieRouter)
app.use("/reviews", reviewRouter)
app.use("/theaters", theatersRouter)

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
  })

//Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});


module.exports = app;
