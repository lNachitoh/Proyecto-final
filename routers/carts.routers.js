import { Router } from "express";
import ProductManager from '../src/ProductManager.js'
import CarritoManager from '../src/Carrito.js'

const productManager = new ProductManager('/home/lnachitoh/Desktop/nachitoh/Curso Backend/EjercicioServidor/Productos.json')
const router = Router()
const carrito = new CarritoManager('/home/lnachitoh/Desktop/nachitoh/Curso Backend/EjercicioServidor/Carrito.json')

router.post("/",async (req,res)=>{
    await carrito.addNewCart()
    res.sendStatus(201)
})

router.get("/:cid", async (req,res)=>{
    const id = Number(req.params.cid)
    const products = await carrito.productsCart(id)
    if(products === 0){
        res.sendStatus(404)
    }else{

        res.send(products)
    }
})

router.post("/:cid/product/:pid",async(req,res)=>{
    const idProduct = Number(req.params.pid)
    const idCart = Number(req.params.cid)
    const product = await productManager.getProductById(idProduct)
    if(product){
        const estado = await carrito.addProductCar(idCart, product)
        if (estado === 1){
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }else{
        res.sendStatus(404)
    }
})



export default router