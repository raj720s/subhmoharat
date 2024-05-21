import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(3)
})