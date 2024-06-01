import { z } from "zod"


export const cartSchema = z.object({
    productId: z.number(),
    quantity: z.number()
})

export const updateCartSchmea = z.object({
    quantity: z.number()
})