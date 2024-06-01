import { Router } from "express"
import { asyncMiddleware } from "../middlewares/asyncError"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller"
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authorize"

const productRoutes: Router = Router()

productRoutes.get('/', asyncMiddleware(getProducts))

productRoutes.get('/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(getProduct))

productRoutes.post('/add', authMiddleware, adminAuthMiddleware, asyncMiddleware(createProduct))

productRoutes.put('/update/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(updateProduct))

productRoutes.delete('/delete/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(deleteProduct))



export default productRoutes