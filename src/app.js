require('dotenv').config({ path: './.env' });

const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const Product = require('./models/product.model');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

const app = express();


connectDB();


const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 8080;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine('handlebars', engine({
    helpers: {
        json: function (context) {
            return JSON.stringify(context);
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);



app.set('socketio', io);

io.on('connection', async (socket) => {
    console.log('🟢 Cliente conectado');

    try {
        const products = await Product.find().lean();
        socket.emit('updateProducts', products);

        socket.on('newProduct', async (data) => {
            await Product.create(data);

            const updatedProducts = await Product.find().lean();
            io.emit('updateProducts', updatedProducts);
        });

        socket.on('deleteProduct', async (id) => {
            await Product.findByIdAndDelete(id);

            const updatedProducts = await Product.find().lean();
            io.emit('updateProducts', updatedProducts);
        });

    } catch (error) {
        console.error('❌ Error en sockets:', error);
    }
});


app.get('/', (req, res) => {
    res.redirect('/products');
});


httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});