const Product = require("../models/product.model.js");

module.exports = {
    getAllProducts: (req, res) => {
        Product.find({})
            .then((allProducts) => res.json(allProducts))
            .catch((err) => console.log(err));
    },

    getOneProduct: (req, res) => {
        Product.findOne({ _id: req.params.id })
            .then((oneProduct) => res.json(oneProduct))
            .catch((err) => console.log(err));
    },

    createProduct: (req, res) => {
        Product.create(req.body) 
            .then((newProduct) => res.json(newProduct))
            .catch((err) => console.log(err));
    },
    updateProduct: (req, res) => {
        Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(updatedProduct => {
                if (!updatedProduct) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                res.json(updatedProduct);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }, 
    deleteProduct : (req, res) => {
        Product.deleteOne({ _id: req.params.id }) 
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err));
    }
};