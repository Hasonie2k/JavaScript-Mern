const Joke = require("../models/jokeM");

module.exports = {
    findAllJokes:(req, res)=>{
        Joke.find()
            .then( allJoke => res.json(allJoke))
            .catch( err => console.log(err));
    },

    createJoke: (req, res) => {
        Joke.create(req.body)
            .then( newJoke => res.json(newJoke))
            .catch( err => console.log(err));
    },

    findOneJoke: (req , res) => {
        Joke.findById(req.params.id)
            .then ( oneJoke => res.json(oneJoke))
            .catch( err => console.log(err));
    },

    updateJoke: (req , res ) => {
        Joke.findByIdAndUpdate(req.params.id, req.body, { new: true})
            .then( updatedJoke => res.json(updatedJoke))
            .catch( err => console.log(err));
    },

    deleteJoke: (req , res ) => {
        Joke.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch( err => console.log(err));
    },
}