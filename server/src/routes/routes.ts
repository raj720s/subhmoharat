import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import userRoutes from "./user.route";
import cartRoutes from "./cart.route";
import orderRoutes from "./order.ruote";


const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/cart', cartRoutes)
rootRouter.use('/order', orderRoutes)

export default rootRouter