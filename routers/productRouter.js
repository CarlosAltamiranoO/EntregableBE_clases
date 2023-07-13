const { Router } = require('express')
const ProductManager = require('../src/productM')

const productRouter = Router()
const manager = new ProductManager.ProductManager('./data/Products.json')

productRouter.get('/', async (req, res) => {
    const productos = await manager.getProduct()
    res.render('Products', {
        title: "listar Productos",
        hayProductos: productos.length > 0,
        productos,
    })
})
productRouter.get('/realtimeproducts', async (req, res) => {
    const productos = await manager.getProduct()
    res.render('realTimeProducts', {
        hayProductos: productos.length > 0,
        productos,
    })
 })
module.exports = productRouter