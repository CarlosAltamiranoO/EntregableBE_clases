const serverSocket = io('http://localhost:8080')

const btnEnviar = document.querySelector('#btnEnviar')
const btnBorrar = document.querySelector('#btnBorrar')

if (btnEnviar) {
    btnEnviar.addEventListener('click',
        evento => {

            const inputTitle = document.querySelector('#inputTitle')
            const inputDescription = document.querySelector('#inputDescription')
            const inputPrice = document.querySelector('#inputPrice')
            const inputThumbnail = document.querySelector('#inputThumbnail')
            const inputCategory = document.querySelector('#inputCategory')
            const inputCode = document.querySelector('#inputCode')
            const inputStock = document.querySelector('#inputStock')
            if (inputCode && inputStock && inputDescription && inputPrice && inputTitle && inputCategory) {
                const title = inputTitle.value
                const description = inputDescription.value
                const price = parseFloat(inputPrice.value)
                const thumbnail = inputThumbnail.value
                const category = inputCategory.value
                const code = inputCode.value
                const stock = parseInt(inputStock.value)
                serverSocket.emit('nuevoproducto', { title, description, price, thumbnail, category, code, stock })
            }
        }
    )
}
if (btnBorrar) {
    btnBorrar.addEventListener('click',
        evento => {
            const imputId = document.querySelector('#inputId')
            if (imputId) {
                const id = imputId.value
                serverSocket.emit('borrado', id)
            }
        }
    )
}
serverSocket.on('actualizarProductos', productos => {
    const divProductos = document.querySelector('#productos')
    console.log(productos)
    if (divProductos) {
        /* divProductos.innerHTML = `<h3>${JSON.stringify(productos)}<h3/>` */
        let mensaje = ""
        for (producto of productos) {
            mensaje += `<h4> - ID: ${producto.id} | Titulo: ${producto.title} | Desripcion : ${producto.description} | codigo: ${producto.code} | Precio: ${producto.price} |
        Categoria: ${producto.category} | Stock: ${producto.stock}<h4/>`
        }
        divProductos.innerHTML = mensaje
    }
})
serverSocket.on('error', error => {
    const pError = document.querySelector('#error')
    if (pError) {
        pError.innerHTML = JSON.stringify(error)
    }
})