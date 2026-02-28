# Backend I – Primera Entrega

Proyecto correspondiente a la **Entrega N°1** del curso **Backend I** de Coderhouse.

El objetivo de esta entrega es desarrollar un servidor con Node.js y Express que permita gestionar productos y carritos de compra, utilizando persistencia en archivos JSON.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- File System (fs)

---

## 📁 Estructura del proyecto

src/
├── app.js
├── routes/
│ ├── products.routes.js
│ └── carts.routes.js
├── managers/
│ ├── ProductManager.js
│ └── CartManager.js
└── data/
├── products.json
└── carts.json

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

git clone https://github.com/Sed3r/Entregas-Backend-I.git

2. Instalar dependencias:

npm install

3. Ejecutar el servidor:

npm start

O en modo desarrollo:

npm run dev

El servidor se ejecuta en el puerto **8080**.

---

## 📦 Endpoints disponibles

### Productos (`/api/products`)

- `GET /` → Obtener todos los productos
- `GET /:pid` → Obtener un producto por ID
- `POST /` → Crear un nuevo producto
- `PUT /:pid` → Actualizar un producto
- `DELETE /:pid` → Eliminar un producto

---

### Carritos (`/api/carts`)

- `POST /` → Crear un nuevo carrito
- `GET /:cid` → Obtener productos de un carrito
- `POST /:cid/product/:pid` → Agregar un producto al carrito

Si el producto ya existe en el carrito, se incrementa la cantidad.

---

## 📝 Notas

- La persistencia de datos se realiza mediante archivos JSON.
- Los IDs se generan automáticamente para evitar duplicados.
- No se incluye interfaz gráfica; las pruebas se realizan mediante Postman o cliente similar.

---

## 👤 Autor

Jonatan Calgaro
mongodb://localhost:2701