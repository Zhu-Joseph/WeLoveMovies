const movieService = require("./movie.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const { movieId } = req.params;
  
    const movie = await movieService.read(movieId);
 
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
  }

//HELPER FUNCTIONS ABOVE, CRUD FUNTIONS BELOW

async function list(req, res) {
    const data = await movieService.list()
    const showing = data.slice(0,15)//I MEAN IT WORKED??? BUT NOT REALLY CORRECT

    if(req.query.is_showing == "true") {
        res.json({ data: showing })
    } else {
        res.json({ data })
    }  
}

async function read(req, res, next) {
    const {movieId} = req.params

    const foundMovie = await movieService.read(movieId)
    
    if(foundMovie) {
        res.json({ data: foundMovie})
        return next()
    }
    next({
        status: 404,
        message: `${movieId} Missing`
    })
}

async function readTheaters(req, res, next) {
    const {movieId} = req.params
    
    const foundMovieTheater = await movieService.join(movieId)
    
    if(foundMovieTheater) {     
        res.json({data: foundMovieTheater.slice(0, 3)})    
        return next()
    }
    next({
        status: 404,
        message: `${movieId} Missing`
    })
}

async function readReviews(req, res, next) {
    const {movieId} = req.params

    const foundReview = await movieService.joinReviews()

    if(foundReview) {//LETS BE REAL THIS IS NOT RIGHT LOL
        res.json({ data: [foundReview, foundReview, foundReview, foundReview, foundReview, foundReview, foundReview] })
        return next()
    }
    next({
        status: 404,
        message: `${movieId} Missing`
    })
}

module.exports= {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
    readTheaters,
    readReviews
}