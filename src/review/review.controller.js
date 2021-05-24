const reviewService = require("./review.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExist(req, res, next) {
    const { reviewId } = req.params;
  
    const review = await reviewService.read(reviewId);
 
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }

//HELPER FUNCTIONS ABOVE, CRUD FUNTIONS BELOW

async function update(req, res, next) {
    const updateReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };

    const data = await reviewService.update(updateReview);

    const data2 = await reviewService.join()
    data2.created_at = "12312315"
    data2.updated_at = "12312315"
    
    res.json({data: data2});
  }

//DELETE FUNCTION
async function destroy(req, res, next) {     
    const data = await reviewService.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports= {
    update: [reviewExist, update],
    delete: [reviewExist, asyncErrorBoundary(destroy)]
}