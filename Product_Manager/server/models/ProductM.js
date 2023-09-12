const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: { type: String },
    price: { type: Number },
    desc:  {type: String}
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);