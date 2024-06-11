import { Router } from "express";
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authorize";
import { asyncMiddleware } from "../middlewares/asyncError";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listAllusers, updateUser } from "../controllers/user.contriollers";


const userRoutes: Router = Router()

userRoutes.get('/address', authMiddleware, asyncMiddleware(listAddress))
userRoutes.post('/address', authMiddleware, asyncMiddleware(addAddress))
userRoutes.put('/', authMiddleware, asyncMiddleware(updateUser))
userRoutes.delete('/address', authMiddleware, asyncMiddleware(deleteAddress))
userRoutes.get('/', authMiddleware, adminAuthMiddleware, asyncMiddleware(listAllusers))
userRoutes.put('/role/:id', authMiddleware, asyncMiddleware(changeUserRole))
userRoutes.get('/:id', authMiddleware, asyncMiddleware(getUserById))

export default userRoutes