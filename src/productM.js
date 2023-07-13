const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path
        this.id = 0;
        this.products = []
    }

    async getProduct() {
        try {
            const json = await fs.promises.readFile(this.path, 'utf-8')
            if (json === "") {
                return "la lista esta vacia"
            }
            else {
                this.products = JSON.parse(json)
                this.id = this.products.length
            }
            return this.products
        } catch (error) {
            console.error(error)
        }

    }

    async salveProduct() {
        try {
            const json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, json)
            return "se guardo el producto"
        } catch (error) {
            console.error(error)
        }

    }

    async addProduct(title, description, price, thumbnail, code, category, stock) {
        try {
            await this.getProduct()
            let encontrado = this.products.find((p) => p.code === code)
            if (encontrado === undefined) {
                this.id++
                this.products.push({ id: this.id, title: title, description: description, price: price, thumbnail: thumbnail, code: code, category: category, stock: stock })
                console.log(await this.salveProduct())
                return "se agrego el producto"
            }
            else return "el producto ya esta cargado"
        } catch (error) {
            console.error(error)
        }
    }

    async getProductsById(id) {
        try {
            await this.getProduct()
            let respuesta = this.products.find((producto) => producto.id === id)
            if (respuesta === undefined) return "ERROR: el  producto no existe"
            else return respuesta
        } catch (error) {
            console.error(error)
        }
    }

    async updateProduct(id, campoActualizar, cambio) {
        try {
            await this.getProduct()
            const indice = this.products.findIndex(aux => aux.id === id)
            if (indice === -1) {
                console.log("no hay producto a actualizar")
                return
            }
            const producto = this.products[indice]
            producto[campoActualizar] = cambio
            this.products[indice] = producto
            await this.salveProduct()
            console.log("Producto actualizado:", producto)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            await this.getProduct()
            const aux = this.products.filter((producto) => producto.id !== id)
            if (JSON.stringify(aux) === JSON.stringify(this.products)) {
                return "No hay producto a eliminar"
            }
            else {
                this.products = aux
                await this.salveProduct()
                return "producto eliminado"
            }
        } catch (error) {
            console.log(error)
        }

    }
}
exports.ProductManager = ProductManager