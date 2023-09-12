const ProductC = require('../controllers/ProductC');
module.exports = (app) => {
    app.get('/api', ProductC.index);
    app.post('/api/product', ProductC.createProduct);
    app.get('/api/products', ProductC.getAllProducts);
    app.get('/api/product/:id', ProductC.findOneProduct);
}