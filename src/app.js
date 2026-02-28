const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const ProductManager = require('./managers/ProductManager');
const express = require('express');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const productManager = new ProductManager();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.set('io', io);

io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    socket.on('newProduct', async (data) => {
        console.log("DATA RECIBIDA:", data);
        
        await productManager.addProduct(data);
        
        const updatedProducts = await productManager.getProducts();
        console.log("PRODUCTOS ACTUALIZADOS:", updatedProducts);
        
        io.emit('updateProducts', updatedProducts);
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});