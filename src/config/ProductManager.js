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
        await fs.writeFile(this.path, JSON.stringify(productos))
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
    return productos;
  }

  async getProductById(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"))
    const producto = productos.find(producto => producto.id === id)
    if (producto) {
      return producto
    } else {
      console.error("Producto no encontrado", id);
      return "Producto no encontrado"
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
