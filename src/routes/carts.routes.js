const express = require('express');
const router = express.Router();

const Cart = require('../models/cart.model');


router.post('/', async (req, res) => {
    try {

        const newCart = await Cart.create({ products: [] });

        res.json({
            status: "success",
            payload: newCart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.get('/:cid', async (req, res) => {
    try {

        const cart = await Cart.findById(req.params.cid)
            .populate("products.product");

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        res.json({
            status: "success",
            payload: cart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.post('/:cid/products/:pid', async (req, res) => {

    const { cid, pid } = req.params;

    try {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        const existingProduct = cart.products.find(
            p => p.product.toString() === pid
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await cart.save();

        res.json({
            status: "success",
            payload: cart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.delete('/:cid/products/:pid', async (req, res) => {

    const { cid, pid } = req.params;

    try {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        cart.products = cart.products.filter(
            p => p.product.toString() !== pid
        );

        await cart.save();

        res.json({
            status: "success",
            payload: cart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.put('/:cid', async (req, res) => {

    try {

        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.cid,
            { products: req.body.products },
            { new: true }
        );

        res.json({
            status: "success",
            payload: updatedCart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.put('/:cid/products/:pid', async (req, res) => {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        const product = cart.products.find(
            p => p.product.toString() === pid
        );

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado en el carrito"
            });
        }

        product.quantity = quantity;

        await cart.save();

        res.json({
            status: "success",
            payload: cart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.delete('/:cid', async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.cid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        cart.products = [];

        await cart.save();

        res.json({
            status: "success",
            payload: cart
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


module.exports = router;
