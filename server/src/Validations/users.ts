import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string().email().min(3),
    name: z.string(),
    password: z.string().min(3)
})

export const updateUserSchema = z.object({
    name: z.string(),
    defaultAddress: z.number().nullable()
})