import fs from 'fs';

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

export default ProductManager;
