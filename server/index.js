import express from 'express'
import cors from 'cors'
import yourRouter from './Routers/yourRouter.js'
import authRouter from './Routers/AuthRouter.js'
 
const server = express();
 
server.use(express.json())
server.use(cors())
server.use("/abc", yourRouter)
server.use("/auth", authRouter)
 
server.get("/", (req, res) => {
 res.send("The server is running")
})
 
server.listen(4000, () => {
 console.log("The server is running at port 4000")
})