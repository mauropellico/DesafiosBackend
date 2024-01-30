import { promises as fs } from 'fs'

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(nuevoProducto) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    if (nuevoProducto.code && nuevoProducto.id && nuevoProducto.title && nuevoProducto.description
      && nuevoProducto.price && nuevoProducto.thumbnail && nuevoProducto.code && nuevoProducto.stock) {
      const index = productos.findIndex(producto => producto.code === nuevoProducto.code)
      console.log(index)
      if (index === -1) {
        productos.push(nuevoProducto)
        console.log(productos)
        await fs.writeFile(this.path, JSONsify(productos))
        console.log("Producto creado correctamente");
      } else {
        console.log("El producto ya existe")
      }
    } else {
      console.log("Ingrese un producto con las correspondientes propiedades")
    }
  }

  async getProducts() {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    console.log(productos)
  }

  async getProductById(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    const producto = productos.find(producto => producto.id === id)
    if (producto) {
      console.log(producto)
    } else {
      console.error("Producto no encontrado", id);
    }
  }

  async updateProduct(id, nuevoProducto) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    const index = productos.findIndex(producto => producto.id === id)
    if (index != -1) {
      productos[index].stock = nuevoProducto.stock
      productos[index].price = nuevoProducto.price
      productos[index].title = nuevoProducto.title
      productos[index].thumbnail = nuevoProducto.thumbnail
      productos[index].description = nuevoProducto.description
      productos[index].code = nuevoProducto.code
      await fs.writeFile(this.path, JSON.stringify(productos))
      console.log("Producto actualizado correctamente")
    } else {
      console.log("El producto no existe")
    }
  }

  async deleteProduct(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    const index = productos.findIndex(producto => producto.id === id)
    if (index != -1) {
      const productosFiltrados = productos.filter(producto => producto.id != id)
      await fs.writeFile(this.path, JSON.stringify(productosFiltrados))
      console.log("Producto eliminado correctamente")
    } else {
      console.log("Producto no existe")
    }
  }
}

/*
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
*/