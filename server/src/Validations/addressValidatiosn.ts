import { z } from "zod";

export const AddressValidation = z.object({
    street: z.string(),
    city: z.string(),
    pin: z.string()
})