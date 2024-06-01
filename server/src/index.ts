import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/routes";
import { PrismaClient } from "@prisma/client";

import { registerSchema } from "./Validations/users";
import { errorMiddleware } from "./middlewares/error";
import { invalidRouteCatcher } from "./middlewares/invalidRoute";

const app = express();
app.use(express.json())

app.use('/api', rootRouter)

// app.use(errorMiddleware)



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


app.listen(PORT, async () => {
    await prisma.$connect().then(() => console.log("DB connected")).catch((err) => console.log(err))
    console.log(`server listening on PORT ${PORT}`)

})
// @ts-ignore
app.use('*', invalidRouteCatcher)
// @ts-ignore
app.use(errorMiddleware)

