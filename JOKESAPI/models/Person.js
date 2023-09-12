const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    firstName: String,
    lastName: String, 
    Age : Number 
} , {timestamps: true})

module.exports = (mongoose.model("Person", PersonSchema));