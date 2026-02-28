🛒 Backend I – Segunda Entrega

Proyecto correspondiente a la Entrega N°2 del curso Backend I de Coderhouse.

---

📖 Introducción

En esta etapa se amplía el servidor desarrollado en la primera entrega, incorporando:

Renderizado con Express-Handlebars

Comunicación en tiempo real con Socket.io

Persistencia en archivos JSON

Actualización dinámica de productos en múltiples clientes

---

🚀 Tecnologías Utilizadas

Node.js

Express

Express-Handlebars

Socket.io

JavaScript

File System (fs)

---

📁 Estructura del Proyecto
src/
├── app.js
├── routes/
│   ├── products.routes.js
│   ├── carts.routes.js
│   └── views.routes.js
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
├── views/
│   ├── home.handlebars
│   └── realTimeProducts.handlebars
└── data/
    ├── products.json
    └── carts.json

---


⚙️ Instalación
1️⃣ Clonar el repositorio
git clone https://github.com/Sed3r/Entregas-Backend-I.git

2️⃣ Instalar dependencias
npm install

▶️ Ejecución
npm start

Modo desarrollo:

npm run dev

Servidor disponible en:

http://localhost:8080

---

🌐 Vistas Disponibles

🏠 /home

Renderiza el listado de productos con Handlebars

Implementa Server Side Rendering

---

⚡ /realtimeproducts

Vista con actualización en tiempo real mediante WebSockets.

Permite:

➕ Agregar productos dinámicamente

❌ Eliminar productos

🔄 Sincronizar cambios en todas las pestañas abiertas

💾 Persistir datos en products.json

📦 Endpoints Disponibles

🛍 Productos — /api/products

| Método | Endpoint | Descripción                 |
| ------ | -------- | --------------------------- |
| GET    | `/`      | Obtener todos los productos |
| GET    | `/:pid`  | Obtener producto por ID     |
| POST   | `/`      | Crear nuevo producto        |
| PUT    | `/:pid`  | Actualizar producto         |
| DELETE | `/:pid`  | Eliminar producto           |

🛒 Carritos — /api/carts

| Método | Endpoint             | Descripción                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/`                  | Crear nuevo carrito         |
| GET    | `/:cid`              | Obtener carrito por ID      |
| POST   | `/:cid/product/:pid` | Agregar producto al carrito |


Si el producto ya existe en el carrito, se incrementa la cantidad.

---

🔄 Funcionamiento en Tiempo Real

La vista /realtimeproducts utiliza Socket.io para:

Detectar nuevas conexiones

Emitir la lista actualizada de productos

Sincronizar altas y eliminaciones

Reflejar cambios instantáneamente en todos los clientes conectados

Mantener persistencia en archivo JSON

---


🧠 Conceptos Aplicados

Arquitectura basada en routers

Separación de responsabilidades (Routes / Managers)

Persistencia en archivos

Server Side Rendering

Comunicación bidireccional con WebSockets

Sincronización en tiempo real

---

👤 Autor

Jonatan Calgaro

mongodb://localhost:2701