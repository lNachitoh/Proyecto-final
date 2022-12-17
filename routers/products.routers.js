import ProductManager from '../src/ProductManager.js'
import { Router } from "express";


const router = Router()
const productManager = new ProductManager('/home/lnachitoh/Desktop/nachitoh/Curso Backend/EjercicioServidor/Productos.json')



router.get("/", async (req,res)=>{
    let allProducts = await productManager.getAll()
    const limit = Number(req.query.limit)
    const products = Object.values(allProducts)
    if (limit){ 
        const productosfinal = products.slice(0, limit)
        res.send(productosfinal)
    }
    else {
        res.send(allProducts)
    }
})


router.get("/:pid", async (req,res)=>{
    const id = Number(req.params.pid)
    const producto = await productManager.getProductById(id)
    if (producto === 0){
        res.sendStatus(404)
    }else {
        res.send(producto)
    }
})

router.post("/", async (req,res) =>{
    const product = await productManager.addProduct(req.body)
    if (product === 1){
        res.sendStatus(201)
    }else{
        res.sendStatus(400)
    }
})

router.delete("/:pid", async (req, res) =>{
    const id = Number (req.params.pid)
    const estado = await productManager.deleteProduct(id)
    if (estado === 1){
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }
})

router.put("/:pid", async (req,res)=>{
    const id = Number(req.params.pid)
    const newProduct = req.body
    const estado = await productManager.updateProduct(id,newProduct)
    if (estado === 0){
        res.sendStatus(400)
    }else{
        res.sendStatus(200)
    }
})

export default router