import express from 'express'
//import ProductManager from './src/ProductManager.js'
import productsRouter from './routers/products.routers.js'
import carritoRouter from './routers/carts.routers.js'

const app = express()
const PORT = 8080
//const productManager = new ProductManager('./Productos.json')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())


app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en la direccion: http://localhost:${PORT}`)
})

app.use('/api/products',productsRouter)
app.use('/api/carts',carritoRouter)




