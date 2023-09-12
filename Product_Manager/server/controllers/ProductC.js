const Product = require('../models/ProductM');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
};

module.exports.createProduct = (request, response) => {
    Product.create(request.body)
        .then(product => response.json(product))
        .catch(err => response.json(err));
};

module.exports.getAllProducts = (request, response) => {
    Product.find()
        .then(products => {
            response.json(products);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: 'An error occurred while retrieving products.' });
        });
};

module.exports.findOneProduct = (request, response) => {
    const productId = request.params.id;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return response.status(404).json({ error: 'Product not found' });
            }
            response.json(product);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: 'An error occurred while fetching the product.' });
        });
};
