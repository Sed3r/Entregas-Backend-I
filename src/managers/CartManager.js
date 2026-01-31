const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
    }
    async getCarts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async createCart() {
        const carts = await this.getCarts();

        const newCart = {
            id: Date.now(),
            products: []
        };

        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(Id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === Id);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);

        if (cartIndex === -1) return null;

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === productId);
        
        if (productIndex === -1) {
            cart.products.push({ 
                product: productId,
                quantity: 1 
            });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        carts[cartIndex] = cart;
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;