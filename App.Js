const express = require('express');
const ProductManager = require('..desafio2-solPerezSanchez-cBackend/ProductManager');

const app = express();
const port = 8080; 

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener producto por ID:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
