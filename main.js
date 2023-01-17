const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

const connection = require('./util/database');

app.get('/api/v1/longest-duration-movies', (req, res) => {
    connection.query(`
        SELECT tconst, primaryTitle, runtimeMinutes, genres 
        FROM movies
        ORDER BY runtimeMinutes DESC
        LIMIT 10
    `, (err, movies) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err });
        }else {
            res.status(200).json({movies: movies});
        }
    });
});

app.post('/api/v1/new-movie', (req, res) => {
    const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = req.body;
    connection.query(`
        INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres)
        VALUES ('${tconst}', '${titleType}', '${primaryTitle}', ${runtimeMinutes}, '${genres}')    
    `, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({ err });
        } else {
            res.status(200).json({message: 'new movie added'});
        }
    });
});

app.get('/api/v1/top-rated-movies', (req, res) => {
    connection.query(`
        SELECT m.tconst, m.primaryTitle, m.genres, r.averageRating
        FROM movies m
        JOIN ratings r ON m.tconst = r.tconst
        WHERE r.averageRating > 6.0
        ORDER BY r.averageRating DESC    
    `, (err, result) => {
       if (err) {
          res.status(500).send({ error: 'Error retrieving top-rated movies' });
       } else {
          res.status(200).send(result);
       }
    });
 });
 

app.listen(process.env.PORT, () => {
    console.log('port running');
});