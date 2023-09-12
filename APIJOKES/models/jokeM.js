const mongoose = require("mongoose");

const JokeSchema = new mongoose.Schema({
    joke: String,
    punchline: String, 
} , {timestamps: true})

module.exports = (mongoose.model("Joke", JokeSchema));