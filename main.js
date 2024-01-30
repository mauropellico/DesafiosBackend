import { Producto } from "./Producto.js";
import { ProductManager } from "./ProductManager.js";

const producto1 = new Producto("Arroz", "Muy rico", 1200, 20, "A123")
const producto2 = new Producto("Lentejas", "Sanas", 1500, 25, "L123")
const producto1version2 = new Producto("Arroz", "Muy rico", 1400, 26, "A123")

const productManager = new ProductManager('./productos.json')