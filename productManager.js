const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
      return [];
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf8');
    } catch (error) {
      console.error('Error al guardar productos:', error.message);
    }
  }

  addProduct(productData) {
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      console.error('Debe completar todos los campos.');
      return;
    }

    const newProduct = {
      id: this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: `img/${productData.thumbnail}`,
      code: productData.code,
      stock: productData.stock,
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log('Producto agregado:', newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);

    if (product) {
      return product;
    } else {
      console.error('No se ha encontrado el producto.');
      return null;
    }
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      console.log('Producto actualizado:', this.products[productIndex]);
    } else {
      console.error('No se ha encontrado el producto.');
    }
  }

  deleteProduct(productId) {
    const updatedProducts = this.products.filter((p) => p.id !== productId);

    if (updatedProducts.length < this.products.length) {
      this.products = updatedProducts;
      this.saveProducts();
      console.log('Producto eliminado con éxito.');
    } else {
      console.error('No se ha encontrado el producto.');
    }
  }
}

// Uso
const productManager = new ProductManager('products.json');

productManager.addProduct({
  title: 'Elite trainer box 151',
  description:
    '1 tarjeta promocional de foil de arte completo con Snorlax. 65 fundas para cartas. 45 cartas de Energía de Pokémon TCG. Una guía para jugadores de la expansión Scarlet & Violet—151.',
  price: 185000,
  thumbnail: 'etbSnorlax.png',
  code: '0001',
  stock: 10,
});

productManager.addProduct({
  title: 'Elite trainer box vivid voltage',
  description: '"La Caja de Entrenador Élite de Espada y Escudo-Voltaje Vívido de JCC Pokémon incluye  -8 paquetes de mejora de Espada y Escudo-Voltaje Vívido de JCC Pokémon-65 fundas para cartas inspiradas en Pikachu Gigamax-45 cartas de Energía de JCC Pokémon-1 guía para jugadores de la expansión Espada y Escudo-Voltaje Vívido-1 libro de reglas de JCC Pokémon-6 dados de contadores de daño-1 dado para lanzamiento de moneda válido para competiciones legales-2 marcadores de condición acrílicos-1 caja de coleccionista para guardarlo todo con 4 divisores para mantenerlo todo organizado-1 carta con código para el Juego de Cartas Coleccionables Pokémon Online"',
  price: 170000,
  thumbnail: 'etbPikachu.png',
  code: '0002',
  stock: 8,
});

console.log('Todos los productos:', productManager.getProducts());

const productIdToUpdate = 2;
productManager.updateProduct(productIdToUpdate, { price: 175000, stock: 5 });

console.log('Productos actualizados:', productManager.getProducts());

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);

console.log('Productos después de eliminar:', productManager.getProducts());
