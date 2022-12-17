import fs from 'fs'


export default class ProductManager {
    constructor(path){
        //this.path
        this.fileName = path
    }

    async addProduct(producto){
        let productos = await this.getAll()
        if (productos === undefined){
            productos = await this.getAll()
            return this.addProduct(producto) 
        }
        if(productos.length == 0 || this.#searchCodes(producto, productos) === -1){
            if(productos.length == 0){
                producto.id = 1
            }else{
                producto.id = productos[productos.length-1].id +1
            }
            productos.push(producto)
            try {
                this.#elementRequired(producto)
                if (productos.status === undefined){
                    await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
                    console.log("El producto fue agregado con exito!")
                    return 1
                }else {
                    producto.status = true
                    await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
                    console.log("El producto fue agregado con exito!")
                    return 1
                }
                //return producto.id
            }catch (err){
                //console.log(err)
            }
        }else{
            console.log(`el codigo ${producto.code} ya esta siendo utilizado para otro producto`)
        }
    }
    async getAll(){
        try {
            const dat = await fs.promises.readFile(this.fileName, 'utf-8')
            if(dat){
                return JSON.parse(dat)
            }else {
                return []
            }
        } catch (error){
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2))
            return undefined
        }
    }
    #searchCodes(product, productos){
        let resultado = productos.findIndex(producto => producto.code === product.code)
        return resultado
    }
    async deleteProduct (id){
        try{
            const productos = await this.getAll()
            const idEncontrado = productos.findIndex(producto => producto.id === id)
            if (idEncontrado >= 0){
                productos.splice(idEncontrado,1)
                await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
                console.log(`El producto con el id ${id} fue eliminado con exito!`)
                return 1
            }else {
                throw new Error (console.log(`El producto con el id ${id} no se encuentra en la lista`))
            }

        }catch(err){}
    }
    async getProducts(){
        let listaproductos = await this.getAll()
        if (listaproductos == undefined){
            //console.log("[]")
            return "[]"
        }else {
            //console.log(listaproductos)
            return listaproductos
        }
    }
    async getProductById(id){
        const productos = await this.getAll()
        let product = productos[productos.findIndex(producto => producto.id === id)]
        if (product === undefined){
            console.log(`No se ha encontrado un producto con este id:"${id}" `)
            return 0
        }else {
            return product
            //console.log(product)
        }
    }
    #typeParameter(element){
        return typeof element
    }
    #elementRequired(product){
        if ((product.tittle ?? 'empty')=== 'empty'){
            throw new Error (console.log("El parametro tittle es obligatorio!"))
        }else if(this.#typeParameter(product.tittle) !== 'string'){
            throw new Error (console.log("El titulo solo puede ser un string"))
        }
        if ((product.description ?? 'empty')=== 'empty'){
            throw new Error (console.log("El parametro description es obligatorio!"))
        }else if(this.#typeParameter(product.description) !== 'string'){
            throw new Error (console.log("El description solo puede ser un string"))
        }
        if (product.stock < 0 || product.stock === undefined){
            throw new Error (console.log("El parametro stock es obligatorio y no puede ser negativo!"))
        }else if(this.#typeParameter(product.stock) !== 'number'){
            throw new Error (console.log("El stock solo puede contener numeros"))
        }
        if ((product.thumnail ?? 'empty')=== 'empty'){
            throw new Error (console.log("El parametro thumnail es obligatorio!"))
        }else if(this.#typeParameter(product.thumnail) !== 'string'){
            throw new Error (console.log("El thumnail solo puede ser un string"))
        }
        if ((product.code ?? 'empty')=== 'empty'){
            throw new Error (console.log("El parametro code es obligatorio!"))
        }else if(this.#typeParameter(product.code) !== 'string'){
            throw new Error (console.log("El code solo puede ser un string"))
        }
        if (product.price <= 0 || product.price === undefined){
            throw new Error (console.log("El parametro price es obligatorio y no puede ser negativo!"))
        }else if(this.#typeParameter(product.price) !== 'number'){
            throw new Error (console.log("El price solo puede contener numeros"))
        }
        if ((product.category ?? 'empty')=== 'empty'){
            throw new Error (console.log("El parametro code es obligatorio!"))
        }else if(this.#typeParameter(product.category) !== 'string'){
            throw new Error (console.log("El category solo puede ser un string"))
        }if(this.#typeParameter(product.status) !== 'boolean'){
            throw new Error (console.log("El status solo puede ser boolean"))
        }
    }
    async updateProduct(id,product){
        const productos = await this.getAll()
        let position = productos.findIndex(producto => producto.id === id)
        if (productos[position] === undefined){
            console.log(`No se ha encontrado ningun producto con este id "${id}"`)
            return 0
        }else{
            try{
                this.#elementRequired(product)
                productos.splice(position,1)
                product.id = id
                productos.push(product)
                await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
                console.log(`El producto con el id ${id} fue actualizado con exito!`)
            }catch(err){}
        }
            
    }
}