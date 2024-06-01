import { Router } from "express";
import { authMiddleware } from "../middlewares/authorize";
import { asyncMiddleware } from "../middlewares/asyncError";
import { addItemTocart, changeQuantity, deleteItemFromCart, getCartItems } from "../controllers/cart.controller";


const cartRoutes = Router();

cartRoutes.get('/', authMiddleware, asyncMiddleware(getCartItems))
cartRoutes.post('/', authMiddleware, asyncMiddleware(addItemTocart))
cartRoutes.delete('/:id', authMiddleware, asyncMiddleware(deleteItemFromCart))
cartRoutes.put('/:id', authMiddleware, asyncMiddleware(changeQuantity))


export default cartRoutes