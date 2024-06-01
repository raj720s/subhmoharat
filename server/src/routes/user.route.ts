import { Router } from "express";
import { authMiddleware } from "../middlewares/authorize";
import { asyncMiddleware } from "../middlewares/asyncError";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/user.contriollers";


const userRoutes: Router = Router()

userRoutes.get('/address', authMiddleware, asyncMiddleware(listAddress))
userRoutes.post('/address', authMiddleware, asyncMiddleware(addAddress))
userRoutes.put('/', authMiddleware, asyncMiddleware(updateUser))
userRoutes.delete('/address', authMiddleware, asyncMiddleware(deleteAddress))

export default userRoutes