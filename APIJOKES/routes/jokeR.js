const JokeController = require("../controllers/jokeC");

module.exports = app =>{
    app.get("/api/joke", JokeController.findAllJokes);
    app.post('/api/joke', JokeController.createJoke);
    app.get('/api/joke/:id', JokeController.findOneJoke);
    app.patch('/api/joke/:id', JokeController.updateJoke);
    app.delete('/api/joke/:id', JokeController.deleteJoke);
}