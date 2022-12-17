import fs from 'fs'

export default class Carrito {
    constructor(path){
        this.path = path
    }


    async addNewCart(){
        //await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))
        let carrito = await this.getAll()
        const carritoEstructura = {
            id: 0,
            products: []
        }
        if (carrito === undefined){
            return this.addNewCart()
        }
        if (carrito.length == 0 ){
            carritoEstructura.id = 1
        }else{
            carritoEstructura.id = carrito[carrito.length-1].id +1
        }
        carrito.push(carritoEstructura)
        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 2))

    }

    async getAll(){
        try {
            const dat = await fs.promises.readFile(this.path, 'utf-8')
            if(dat){
                return JSON.parse(dat)
            }else {
                return []
            }
        } catch (error){
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))
            return undefined
        }
    }

    async productsCart(id){
        const carritos = await this.getAll()
        if (carritos === undefined){
            return 0
        }
        let carrito = carritos[carritos.findIndex(producto => producto.id === id)]
        if (carrito === undefined){
            console.log(`No se ha encontrado un carrito con este id:"${id}" `)
            return 0
        }else {
            //console.log(carrito)
            return carrito.products
        }
    }
    async addProductCar(id,product){
        const carritos = await this.getAll()
        if (carritos === undefined){
            return 0
        }
        let carrito = carritos[carritos.findIndex(producto => producto.id === id)]
        //console.log(carrito)
        if (carrito === undefined){
            console.log(`No se ha encontrado un carrito con este id:"${id}" `)
            return 0
        }else {
            let searchCart = carritos[carritos.findIndex(producto => producto.id === id)]
            //console.log(product.id)
            if(searchCart.products.length === 0){
                carrito.products.push({id:product.id, quantity:1})
                await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2))
                return 1
            }else{
                if(searchCart.products.findIndex(products => products.id === product.id) === -1){
                    carrito.products.push({id:product.id, quantity:1})
                    await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2))
                    return 1
                }else{
                    const recorreAray = arr => {
                        for (let item of arr){
                            if (item.id === product.id){
                                const cantidad = item.quantity
                                item.quantity = cantidad +1
                                break
                            }
                        }
                    }
                    recorreAray(searchCart.products)
                    await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2))
                    return 1
                }
            }

        }
    }
}

//const carrito = new Carrito('./carrito.json')

//carrito.addNewCart()
//carrito.prueba()
//carrito.productsCart(1)