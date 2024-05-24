import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { errorMiddleware } from '../middlewares/errorMiddleware'

const authRoutes: Router = Router()

authRoutes.post('/login', errorMiddleware(login))
authRoutes.post('/register', errorMiddleware(register))

export default authRoutes