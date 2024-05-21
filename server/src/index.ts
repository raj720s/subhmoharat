import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorCatcher } from "./middlewares/error";
import { registerSchema } from "./schema/users";
const app = express();
app.use(express.json())

app.use('/api', rootRouter)



export const prismaClient = new PrismaClient({
    log: ["query", "info", "warn", "error"]
}).$extends({
    query: {
        user: {
            create({ args, query }) {
                args.data = registerSchema.parse(args.data)
                return query(args)
            }
        }
    }
})

app.use(errorCatcher)
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})