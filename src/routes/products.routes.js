const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');


router.get('/', async (req, res) => {
    try {

        const { limit = 10, page = 1, sort, query } = req.query;

        let filter = {};

        if (query) {
            if (query === "true" || query === "false") {
                filter.status = query === "true";
            } else {
                filter.category = query;
            }
        }

        let options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === "asc" ? 1 : -1 };
        }

        const result = await Product.paginate(filter, options);

        res.json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.get('/:pid', async (req, res) => {
    try {

        const product = await Product.findById(req.params.pid);

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        res.json({
            status: "success",
            payload: product
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {

        const newProduct = await Product.create(req.body);

        res.json({
            status: "success",
            payload: newProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.put('/:pid', async (req, res) => {
    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.pid,
            req.body,
            { new: true }
        );

        res.json({
            status: "success",
            payload: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


router.delete('/:pid', async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.pid);

        res.json({
            status: "success",
            message: "Producto eliminado"
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


module.exports = router;