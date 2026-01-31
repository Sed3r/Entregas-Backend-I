const express = require('express');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const cartManager = new CartManager();


router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});


router.get('/:cid', async (req, res) => {
    const cid = Number(req.params.cid);
    const cart = await cartManager.getCartById(cid);

    if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});


router.post('/:cid/product/:pid', async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cid, pid);

    if (!updatedCart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(updatedCart);
});

module.exports = router;
