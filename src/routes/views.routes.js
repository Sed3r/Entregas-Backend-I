const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const Cart = require('../models/cart.model');


router.get('/', (req, res) => {
    res.redirect('/products');
});


router.get('/products', async (req, res) => {

    try {

        const { page = 1, limit = 10, sort } = req.query;

        let options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === "asc" ? 1 : -1 };
        }

        const result = await Product.paginate({}, options);

        res.render('products', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page
        });

    } catch (error) {
        res.status(500).send(error.message);
    }

});

router.get('/realtimeproducts', async (req, res) => {

    try {

        const products = await Product.find().lean();

        res.render('realTimeProducts', { products });

    } catch (error) {
        res.status(500).send(error.message);
    }

});


router.get('/products/:pid', async (req, res) => {

    try {

        const product = await Product.findById(req.params.pid).lean();

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        res.render('productDetail', { product });

    } catch (error) {
        res.status(500).send(error.message);
    }

});


router.get('/carts/:cid', async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.cid)
            .populate("products.product")
            .lean();

        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }

        res.render('cart', { cart });

    } catch (error) {
        res.status(500).send(error.message);
    }

});


module.exports = router;