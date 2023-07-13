const express = require('express')
const productRouter = require('../routers/productRouter')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const ProductManager = require('./productM')


const app = express()
const manager = new ProductManager.ProductManager('./data/Products.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views','./views')
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.static('./public'))

const httpServer = app.listen(8080, () => {console.log("escuchando en puerto 8080")})
const socketServer = new Server(httpServer)

app.use('/', productRouter)

socketServer.on('connection', async socket => {

    console.log(`nuevo cliente conectado! socket id #${socket.id}`)
    socketServer.sockets.emit('actualizarProductos', await manager.getProduct())

    socket.on('nuevoproducto', async producto => {
        await manager.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.category, producto.stock)
        socketServer.sockets.emit('actualizarProductos', await manager.getProduct())
    })

    socket.on('borrado', async identificador =>{
        
        if(identificador){
            try{
                console.log(await manager.deleteProduct(parseInt(identificador)))
            }
            catch (error){
                socketServer.sockets.emit('error', error.message)
            }
            socketServer.sockets.emit('actualizarProductos', await manager.getProduct())
        }   
    })
})


