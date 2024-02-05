import express from 'express'
import { ProductManager } from './config/ProductManager.js'
import { Producto } from "./config/Producto.js";
const app = express()
const productManager = new ProductManager('./src/productos.json')
const producto1 = new Producto("Arroz", "Mucho almidón", 1200, 20, "A123")
const producto2 = new Producto("Porotos", "Mucho hierro", 1200, 20, "H123")
const producto3 = new Producto("Pescado", "Mucho fósforo", 1200, 20, "F123")
productManager.addProduct(producto1)
productManager.addProduct(producto2)
productManager.addProduct(producto3)

app.listen(5000, () => {
    console.log("Server on port 5000")
})

app.get("/", (req, res)=>{
    res.send("Bienvenidos a mi primer servidor, ahora.")
})

app.get("/productos", async (req, res)=>{
    const productos = await productManager.getProducts()
    res.send(productos)


})

app.get('/productos/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    const prod = await productManager.getProductById(idProducto)
    res.send(prod)
})