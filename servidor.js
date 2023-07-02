const express = require('express')
const ProductManager = require('./productM')


const manager = new ProductManager.ProductManager('./Archivo.json')
const app = express()


app.get('/products', async (req, res)=> {
    const limit = req.query.limit
    if (!limit) return res.send(await manager.getProduct())
    let respuesta = await manager.getProduct()
    respuesta = respuesta.slice(0, parseInt(limit))
    return res.send(respuesta)
})

app.get('/products/:pid', async (req, res)=> {
    const productId = parseInt(req.params.pid)
    const respuesta = await manager.getProductsById(productId)
    return res.send(respuesta)
})

app.listen(8080)





