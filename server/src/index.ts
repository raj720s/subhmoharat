import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorCatcher } from "./middlewares/error";
import { registerSchema } from "./schema/users";
const app = express();
app.use(express.json())

app.use('/api', rootRouter)


// export const prisma = new PrismaClient({
//     log: ["query", "info", "warn", "error"]
// }).$extends({
//     query: {
//         user: {
//             create({ args, query }) {
//                 args.data = registerSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// }) or---------

export const prisma = new PrismaClient({
    log: ["query"]
})

app.use(errorCatcher)
app.listen(PORT, async () => {
    await prisma.$connect().then(() => console.log("DB connected")).catch((err) => console.log(err))
    console.log(`server listening on PORT ${PORT}`)

})