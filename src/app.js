const express = require('express');
const productsRouter = require('./routes/products.routes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});