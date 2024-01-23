// El modulo crypto permite trabajar cryptografia con nodejs
import crypto from 'crypto';

class ProductManager {
  constructor() {
    this.productos = [];
  }

  addProduct(producto) {

    const existe = this.productos.some((prod) => prod.code === producto.code);
    if (existe) {
      console.log("El producto ya existe")
    } else {
      producto.id = crypto.randomBytes(2).toString('hex');
      this.productos.push(producto);
      console.log("Producto agregado")
    }
  }

  getProducts() {
    return this.productos;
  }

  getProductById(id) {
    const producto = this.productos.find((prod) => prod.id === id);

    if (producto) {
      console.log(producto)
    } else {
      console.error("Producto no encontrado", id);
    }
  }
}

const productoManager = new ProductManager();

const verProducts = productoManager.getProducts();
console.log(verProducts);


const producto_1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};

const addProducto1 = productoManager.addProduct(producto_1);
console.log(addProducto1);
console.log("Productos actuales:", productoManager.getProducts());

const producto_2 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};

const addProducto2 = productoManager.addProduct(producto_2);
console.log(addProducto2);

const productoPorId = productoManager.getProducts()[0].id;

const encontrarProducto = productoManager.getProductById(productoPorId);
console.log(encontrarProducto);
