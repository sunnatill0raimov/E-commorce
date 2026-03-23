import express from "express"
import { createProducts, deleteProduct, getProducts, updateProduct } from '../controllers/products.controller.js'

const productsRouter = express.Router()

productsRouter.get('/', getProducts)
productsRouter.post('/', createProducts)
productsRouter.put('/:id', updateProduct)
productsRouter.delete('/:id', deleteProduct)

export default productsRouter