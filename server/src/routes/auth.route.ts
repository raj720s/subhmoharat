import { Router } from 'express'
import { login, me, register } from '../controllers/auth.controller'
import { asyncMiddleware } from '../middlewares/asyncError'
import { authMiddleware } from '../middlewares/authorize'





const authRoutes: Router = Router()

authRoutes.post('/login', asyncMiddleware(login))
authRoutes.post('/register', asyncMiddleware(register))
authRoutes.get('/me', authMiddleware, asyncMiddleware(me))



export default authRoutes