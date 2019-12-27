const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const movies = require('./movies.json')

app = express();

app.use(morgan('dev'));
app.use(helmet())
app.use(cors())

function handleGetMovies(req, res) {

  let response = movies

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if (req.query.country) {
    console.log(req.query.country)
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.avg_vote) {
    response = response.filter(movie =>
      parseFloat(movie.avg_vote) >= parseFloat(req.query.avg_vote)
    )
  }

  res.send(response)
}

app.get('/movie', handleGetMovies)

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})