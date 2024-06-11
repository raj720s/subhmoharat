import { Router } from "express"
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authorize"
import { asyncMiddleware } from "../middlewares/asyncError"
import { cancelOrder, changeOrderStatus, createOrder, getOrderById, listAllOrders, listOrderByUser, listOrders } from "../controllers/order.controller"


const orderRoutes = Router()

orderRoutes.get('/', authMiddleware, asyncMiddleware(listOrders))
orderRoutes.post('/', authMiddleware, asyncMiddleware(createOrder))

orderRoutes.get('/all', authMiddleware, adminAuthMiddleware, asyncMiddleware(listAllOrders))
orderRoutes.get('/:id', authMiddleware, asyncMiddleware(getOrderById))
orderRoutes.get('/user/:id', authMiddleware, asyncMiddleware(listOrderByUser))
orderRoutes.put('/status/:id', authMiddleware, asyncMiddleware(changeOrderStatus))




export default orderRoutes