import { Router } from "express"
import { asyncMiddleware } from "../middlewares/asyncError"
import { createProduct, deleteProduct, getProduct, getProducts, searchProducts, updateProduct } from "../controllers/product.controller"
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authorize"

const productRoutes: Router = Router()

productRoutes.get('/', asyncMiddleware(getProducts))

productRoutes.get('/search', authMiddleware, asyncMiddleware(searchProducts))

productRoutes.post('/add', authMiddleware, adminAuthMiddleware, asyncMiddleware(createProduct))

productRoutes.put('/update/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(updateProduct))

productRoutes.delete('/delete/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(deleteProduct))
productRoutes.get('/:id', authMiddleware, adminAuthMiddleware, asyncMiddleware(getProduct))



export default productRoutes