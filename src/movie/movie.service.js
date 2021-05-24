const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties");

const addMovies = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});


// HELPER FUNCTIONS ABOVE, ACTUAL KNEX FUNCTIONS BELOW
function list() {
    return knex("movies") 
    .select("*")    
}

function listShowings() {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({"is_showing": true})
}

function read(movie_id = 0) {
    return knex("movies") 
    .select("*")
    .where({movie_id})
    .first()
}

function join() {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id","t.theater_id")
    .select("t.*", "mt.*")
}

function joinReviews(movie_id = 0) {
    return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id","c.critic_id")
    .select("r.*", "c.*")
    .first()
    .then(addMovies)
}


module.exports = {
    list,
    listShowings,
    read,
    join,
    joinReviews
}